import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'dotenv-safe/config';
import 'reflect-metadata';

import app from './app';

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server listening at ${port} port`);
});
