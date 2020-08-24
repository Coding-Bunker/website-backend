import { Response } from 'express';
import { getRepository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

import { createRefreshToken } from './token';
import { AUTHORIZATION_LEVEL, API_KEY_CALL_LIMIT } from '../constants';
import { Account } from '../entity/account';
import { ApiKey } from '../entity/apiKey';
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

export const associateApiKeyToAccount = async (account: Account) => {
	const userAuthLevel = getAuthLevel(account);

	const AccountRepo = getRepository(Account);
	const ApiKeyRepo = getRepository(ApiKey);

	const apiKey = new ApiKey();
	apiKey.remainingMontlyCall = API_KEY_CALL_LIMIT[userAuthLevel];

	await ApiKeyRepo.save(apiKey);

	account.apiKey = apiKey;

	await AccountRepo.save(account);

	return apiKey;
};
