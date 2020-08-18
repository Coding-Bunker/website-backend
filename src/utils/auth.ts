import { Response } from 'express';
import { genSalt, hash } from 'bcryptjs';

import { createRefreshToken } from './token';
import { AUTHORIZATION_LEVEL } from '../constants';
import { Account } from '../entity/account';
import { Auhorization } from '../types';

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie('jid', token, {
		httpOnly: true,
		path: '/auth/refresh_token',
	});
};

export const getAuthLevel = (user: Account): Auhorization.Tiers =>
	(Object.keys(AUTHORIZATION_LEVEL) as Auhorization.Tiers[]).find(
		level => AUTHORIZATION_LEVEL[level] === user.role,
	) || 'MEMBER';

export const hashPassword = async (password: string) => {
	const salt = await genSalt();
	const hashedPassword = hash(password, salt);

	return hashedPassword;
};
