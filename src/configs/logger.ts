import * as winston from 'winston';
import { Format } from 'logform';
import chalk from 'chalk';

import './env';

import { Log } from '../types';

const formats: Format[] = [
	winston.format.timestamp({
		format: 'YYYY-MM-DD hh:mm:ss.SSS',
	}),
];

if (__DEV__) formats.push(winston.format.colorize());
formats.push(
	winston.format.printf(
		({ level, message, timestamp, label }) =>
			`${__DEV__ ? chalk.blue(timestamp) : timestamp} ${__DEV__ ? chalk.bold(level) : level} ${
				(label && __DEV__ ? chalk.cyan(`[${label}] `) : `[${label}] `) || ''
			}${message}`,
	),
);

const logger = winston.createLogger({
	level: __DEV__ ? 'debug' : 'info',
	format: winston.format.combine.apply(winston.format.combine, formats),
	transports: [new winston.transports.Console()],
});

export default {
	info: ({ message, label }: Log) => {
		logger.log({
			level: 'info',
			label,
			message,
		});
	},
	warn: ({ message, label }: Log) => {
		logger.log({
			level: 'warn',
			label,
			message,
		});
	},
	error: ({ message, label }: Log) => {
		logger.log({
			level: 'error',
			label,
			message,
		});
	},
	debug: ({ message, label }: Log) => {
		logger.log({
			level: 'debug',
			label,
			message,
		});
	},
};
