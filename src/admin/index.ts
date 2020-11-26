import AdminBro, { ResourceWithOptions, After, RecordActionResponse } from 'admin-bro';
import { buildRouter } from '@admin-bro/express';
import * as TypeormAdapter from '@admin-bro/typeorm';
import { Connection } from 'typeorm';

// Entities
import { Account } from '../entity/account';
import { ApiKey } from '../entity/apiKey';
import { Attachment } from '../entity/attachment';
import { Contributor } from '../entity/contributor';
import { Event } from '../entity/event';
import { Location } from '../entity/location';
import { Post } from '../entity/post';
import { Project } from '../entity/project';
import { Language } from '../entity/language';

import { createApiKeyAction } from './actions';
import theme from './theme';
import { Resource } from './ResourceManyToMany';
import { makeManyToMany } from './property/ManyToMany.property';

AdminBro.registerAdapter({ Database: TypeormAdapter.Database, Resource });

const parent = {
	icon: 'DataBase',
	name: 'Database',
};

const ContributorLanguagesManyToMany = makeManyToMany('Language');

export const init = (connection: Connection) => {
	const adminPro = new AdminBro({
		rootPath: '/admin',
		resources: [
			{
				resource: Account,
				options: {
					actions: {
						createApiKey: {
							actionType: 'record',
							icon: 'Api_1',
							component: false,
							isVisible: ctx => !ctx.record?.param('apiKeyId'),
							handler: createApiKeyAction,
						},
						delete: {
							after: (async (response, request, ctx) => {
								//console.log(response);

								if (response.record.populated.apiKeyId) {
									const apiKey = response.record.populated.apiKeyId;

									try {
										const apiKeyResource = ctx._admin.findResource('ApiKey');
										await apiKeyResource.delete(apiKey.id);
									} catch (e) {
										throw new Error(e.message);
									}
								}

								return response;
							}) as After<RecordActionResponse>,
						},
					},
					properties: {
						password: {
							isVisible: false,
						},
						tokenVersion: {
							isVisible: false,
						},
						apiKeyId: {
							isVisible: {
								edit: false,
								filter: true,
								list: true,
								show: true,
							},
						},
					},
					parent,
				},
			},
			{
				resource: ApiKey,
				options: {
					actions: {
						delete: {
							isAccessible: false,
						},
					},
					parent,
				},
			},
			{
				resource: Attachment,
				options: {
					parent,
				},
			},
			{
				resource: Contributor,
				options: {
					parent,
					actions: {
						...ContributorLanguagesManyToMany.Actions,
					},
					properties: {
						languages: ContributorLanguagesManyToMany.Component,
					},
				},
			},
			{
				resource: Event,
				options: {
					parent,
				},
			},
			{
				resource: Location,
				options: {
					properties: {
						name: {
							isTitle: true,
						},
					},
					parent,
				},
			},
			{
				resource: Post,
				options: {
					properties: {
						content: {
							type: 'textarea',
							/*components: {
								edit: AdminBro.bundle('./components/postEdit'),
							},*/
						},
					},
					parent,
				},
			},
			{
				resource: Project,
				options: {
					parent,
				},
			},
			{
				resource: Language,
				options: {
					parent,
				},
			},
		] as Array<ResourceWithOptions>,
		branding: {
			companyName: 'Coding Bunker',
			softwareBrothers: false,
		},
	});

	const router = buildRouter(adminPro);

	return { admin: adminPro, router };
};
