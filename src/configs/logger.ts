// TODO: Install Winston logger setup it and create/use a transporter to log data in db and stdout
import * as winston from 'winston';
import chalk from 'chalk';

import { Log } from '../types';

const logger = winston.createLogger({
	level: __DEV__ ? 'debug' : 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD hh:mm:ss.SSS',
		}),
		winston.format.colorize(),
		winston.format.printf(
			({ level, message, timestamp, label }) =>
				`${chalk.blue(timestamp)} ${chalk.bold(level)} ${
					(label && chalk.cyan(`[${label}] `)) || ''
				}${message}`,
		),
	),
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
