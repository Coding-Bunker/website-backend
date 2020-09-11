import AdminBro, { ResourceWithOptions } from 'admin-bro';
import { buildRouter } from '@admin-bro/express';
import * as TypeormAdapter from '@admin-bro/typeorm';
import { Connection } from 'typeorm';

import { Account } from './entity/account';
import { ApiKey } from './entity/apiKey';
import { Attachment } from './entity/attachment';
import { Contributor } from './entity/contributor';
import { Event } from './entity/event';
import { Location } from './entity/location';
import { Post } from './entity/post';
import { Project } from './entity/project';

AdminBro.registerAdapter(TypeormAdapter);

export const init = (connection: Connection) => {
	const adminPro = new AdminBro({
		rootPath: '/admin',
		resources: [Account, ApiKey, Attachment, Contributor, Event, Location, Post, Project],
	});

	const router = buildRouter(adminPro);

	return { admin: adminPro, router };
};
