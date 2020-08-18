import 'dotenv-safe/config';
import 'reflect-metadata';

import './types';

import './configs/env';
import logger from './configs/logger';
import app from './app';
import { createDbConnection } from './db';
import { promisify } from './utils';

const port = process.env.PORT || 8080;

(async () => {
	try {
		await createDbConnection();
		await promisify(cb => app.listen(port, cb));

		logger.info({ message: `listening at ${port} port`, label: 'SERVER' });
	} catch (e) {
		logger.error({
			label: 'DB',
			message: e.message,
		});
	}
})();
