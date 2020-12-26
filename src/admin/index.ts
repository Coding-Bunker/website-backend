import AdminBro, { ResourceWithOptions, After, RecordActionResponse } from 'admin-bro';
import { buildRouter } from '@admin-bro/express';
import * as TypeormAdapter from '@admin-bro/typeorm';
import { Connection } from 'typeorm';

// Entities
import {
	Account,
	ApiKey,
	Attachment,
	Contributor,
	Event,
	Location,
	Post,
	Project,
	Language,
	Speaker,
} from '../entity';

import { createApiKeyAction } from './actions';
import theme from './theme';
import { Resource } from './ResourceManyToMany';
import { makeManyToMany } from './custom/ManyToMany/ManyToMany.property';
import * as Workflow from './custom/Workflow';

AdminBro.registerAdapter({ Database: TypeormAdapter.Database, Resource });

const parent = {
	icon: 'DataBase',
	name: 'Database',
};

const ContributorLanguagesManyToMany = makeManyToMany('Language');
const EventSpeakersManyToMany = makeManyToMany('Speaker');

AdminBro.bundle('./components/triggerWorkflow.tsx', 'SidebarFooter');

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
					actions: {
						...EventSpeakersManyToMany.Actions,
					},
					properties: {
						speakers: EventSpeakersManyToMany.Component,
						locationId: {
							isVisible: false,
						},
					},
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
			{
				resource: Speaker,
				options: {
					parent,
				},
			},
		] as Array<ResourceWithOptions>,
		dashboard: {
			handler: Workflow.handler,
		},
		branding: {
			companyName: 'Coding Bunker',
			softwareBrothers: true,
			theme,
		},
	});

	const router = buildRouter(adminPro);

	return { admin: adminPro, router };
};
