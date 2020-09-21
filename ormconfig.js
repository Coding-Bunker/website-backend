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

	entities: process.env.NODE_ENV === "production" ? ['dist/entity/**/.js'] : ['src/entity/**/*.ts'],
	subscribers: process.env.NODE_ENV === "production" ? ['dist/subscriber/**/.js'] : ['src/subscriber/**/*.ts'],
	migrations: process.env.NODE_ENV === "production" ? ['dist/migration/**/.js'] : ['src/migration/**/*.ts'],
	cli: {
		entitiesDir: 'dist/entity',
		migrationsDir: 'dist/migration',
		subscribersDir: 'dist/subscriber',
	},
};
