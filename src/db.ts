import { createConnection, getConnection } from 'typeorm';

import logger from './configs/logger';

export const createDbConnection = async () => {
	const connection = await createConnection();

	return connection;
};

export const closeDbConnection = async () => {
	const connection = await getConnection();

	await connection.close();
};
