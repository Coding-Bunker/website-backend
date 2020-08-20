import './configs/env';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from './routes';
import logger from './configs/logger';

const app = express();

// Middlewares
app.use(helmet()); // Secure http headers
app.use(cors());

app.use(bodyParser.json({ limit: '200kb' })); // Parse request body
app.use(bodyParser.urlencoded({ extended: true })); // Parse form encoded request

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(
		morgan('dev', {
			stream: {
				write: message => logger.info({ label: 'ROUTER', message: message.replace('\n', '') }),
			},
		}),
	); // HTTP Logging
}

// Routes
app.use('/api/v1', routes);

export default app;
