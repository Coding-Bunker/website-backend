import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'dotenv-safe/config';
import './configs/env';

import app from './app';
import { createDbConnection } from './db';

const port = process.env.PORT || 8080;

(async () => {
	await createDbConnection();

	app.listen(port, () => {
		console.log(`Server listening at ${port} port`);
	});
})();
