import { emit } from 'process';
import { createConnection } from 'typeorm';

import logger from './configs/logger';

export const createDbConnection = async () => {
	const connection = await createConnection();

	logger.info({
		label: 'DB',
		message: 'Connection instaurated',
	});

	return connection;
};
