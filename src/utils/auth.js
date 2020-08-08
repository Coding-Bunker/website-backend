import { createRefreshToken } from './token';

export const sendRefreshToken = (res, token) => {
	res.cookie('jid', token, {
		httpOnly: true,
		path: '/auth/refresh_token',
	});
};
