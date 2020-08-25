import { sign } from 'jsonwebtoken';

import { Account } from '../entity/account';
import { Tokens } from '../types';

export const createAccessToken = (account: Account) =>
	sign(
		{
			userID: account.id,
		} as Tokens.AccessTokenPayload,
		process.env.JWT_ACCESS_TOKEN_SECRET,
		{
			expiresIn: '15m',
		},
	);

export const createRefreshToken = (account: Account) =>
	sign(
		{
			userID: account.id,
			tokenVersion: account.tokenVersion,
		} as Tokens.RefreshTokenPayload,
		process.env.JWT_REFRESH_TOKEN_SECRET,
		{
			expiresIn: '7d',
		},
	);
