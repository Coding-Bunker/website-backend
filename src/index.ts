import 'dotenv-safe/config';
import 'reflect-metadata';

import './types';

import restService from './app';
import logger from './configs/logger';
import { createDbConnection } from './db';
import { promisify } from './utils';
import * as Admin from './admin';
import express from 'express';

const port = process.env.PORT || 8080;

(async () => {
	let app;

	try {
		await createDbConnection();
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
		const { admin, router } = Admin.init();

		app = express();
		app.use(admin.options.rootPath, router);
		app.use(restService);

		logger.info({ message: 'Admin initialized', label: 'SERVER' });
	} catch (e) {
		logger.error({
			label: 'SERVER',
			message: e.message,
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
})();
