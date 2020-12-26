import 'dotenv-safe/config';
import 'reflect-metadata';

import { Connection } from 'typeorm';

import './types';

import restService from './app';
import logger from './configs/logger';
import { createDbConnection } from './db';
import { promisify } from './utils';
import * as Admin from './admin';
import express from 'express';

const port = process.env.PORT || 8080;

const start = async () => {
	let app;
	let connection: Connection;

	try {
		connection = await createDbConnection();
		logger.info({
			label: 'DB',
			message: 'Connection instaurated',
		});
	} catch (e) {
		logger.error({
			label: 'DB',
			message: e.message,
		});

		process.exit(1);
	}

	try {
		const { admin, router } = Admin.init(connection);

		app = express();
		app.use(admin.options.rootPath, router);
		app.use(restService);

		logger.info({ message: 'Admin initialized', label: 'SERVER' });
	} catch (e) {
		logger.error({
			label: 'SERVER',
			message: e,
		});

		process.exit(1);
	}

	try {
		await promisify(cb => app.listen(port, cb));

		logger.info({ message: `listening at ${port} port`, label: 'SERVER' });
	} catch (e) {
		logger.error({
			label: 'SERVER',
			message: e.message,
		});

		process.exit(1);
	}
};

if (require.main === module) {
	start();
}
