require('dotenv').config();

module.exports = {
	name: 'default',
	type: 'postgres',

	url: process.env.DB_URL,

	ssl: {
		rejectUnauthorized: false,
	},

	synchronize: true,
	logging: false,

	entities: ['src/entity/**/*.ts', 'dist/entity/**/.js'],
	subscribers: ['src/subscriber/**/*.ts', 'dist/subscriber/**/*.js'],
	migrations: ['src/migration/**/*.ts', 'dist/migration/**/*.js'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
};
