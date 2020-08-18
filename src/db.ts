import { emit } from 'process';
import { createConnection } from 'typeorm';

import logger from './configs/logger';

export const createDbConnection = async () => {
	try {
		const connection = await createConnection();

		logger.info({
			label: 'DB',
			message: 'Connection instaurated',
		});

		return connection;
	} catch (e) {
		logger.error({
			label: 'DB',
			message: e.message,
		});
	}
};
