import { genSalt, hash } from 'bcryptjs';

import { createRefreshToken } from './token';
import { AUTHORIZATION_LEVEL } from '../constants';

export const sendRefreshToken = (res, token) => {
	res.cookie('jid', token, {
		httpOnly: true,
		path: '/auth/refresh_token',
	});
};

// TODO: Simplificate with lodash
export const getAuthLevel = user =>
	Object.keys(AUTHORIZATION_LEVEL).find(level => AUTHORIZATION_LEVEL[level] === user.role);

export const hashPassword = async password => {
	const salt = await genSalt();
	const hashedPassword = hash(password, salt);

	return hashedPassword;
};
