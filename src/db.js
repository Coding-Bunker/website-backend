import { createConnection } from 'typeorm';

import logger from './configs/logger';

export const createDbConnection = async () => {
	try {
		const connection = await createConnection();

		logger.info('Connection instaurated');
		logger.debug('Debuggo');
		logger.warn('Warno');
		logger.error('Errarro');

		return connection;
	} catch (e) {
		console.error('[ERROR] DB:', e.message);
	}
};
