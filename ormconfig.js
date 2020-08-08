require('dotenv').config();

module.exports = {
	name: 'default',
	type: 'postgres',

	url: process.env.DB_URI,

	ssl: {
		rejectUnauthorized: false,
	},

	synchronize: true,
	logging: false,
	entities: ['dist/entity/*.js'],
	subscribers: ['dist/subscriber/*.js'],
	migrations: ['dist/migration/*.js'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
};
