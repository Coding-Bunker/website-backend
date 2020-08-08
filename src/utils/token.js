import { sign } from 'jsonwebtoken';

export const createAccessToken = user =>
	sign(
		{
			userId: user.id,
		},
		process.env.JWT_ACCESS_TOKEN_SECRET,
		{
			expiresIn: '15m',
		},
	);

export const createRefreshToken = user =>
	sign(
		{
			userId: user.id,
			tokenVersion: user.tokenVersion,
		},
		process.env.JWT_REFRESH_TOKEN_SECRET,
		{
			expiresIn: '7d',
		},
	);
