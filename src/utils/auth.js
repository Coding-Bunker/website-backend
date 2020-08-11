import { createRefreshToken } from './token';
import { AUTHORIZATION_LEVEL } from '../constants';

export const sendRefreshToken = (res, token) => {
	res.cookie('jid', token, {
		httpOnly: true,
		path: '/auth/refresh_token',
	});
};

export const getAuthLevel = user =>
	Object.keys(AUTHORIZATION_LEVEL).find(level => AUTHORIZATION_LEVEL[level] === user.role);
