import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { AUTHORIZATION_LEVEL } from '../constants';
import { Account } from '../entity/account';
import { ApiKey } from '../entity/apiKey';
import { Tokens, Values } from '../types';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const authJWTHeader = req.headers['authorization'];
	const authApiKeyHeader = req.headers['x-api-key'];

	if (authJWTHeader) isAuthJWT(req, res, next);
	else if (authApiKeyHeader) isAuthApiKey(req, res, next);
	else
		res.status(401).json({
			ok: false,
			message: 'unauthorized',
		});
};

export const isAuthJWT = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'] as string;

	if (!authHeader)
		res.status(401).json({
			ok: false,
			message: 'unauthorized',
		});

	let payload;
	try {
		const token = authHeader.split(' ')[1]; // Payload example: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ2IjoxLCJzIjozMTc4Myw

		payload = verify(token, process.env.JWT_ACCESS_TOKEN_SECRET) as Tokens.AccessTokenPayload; // Validate that the token is valid, not expired and not modified
	} catch (e) {
		return res.status(401).json({
			ok: false,
			message: 'token invalid',
		});
	}

	try {
		const AccountRepo = getRepository(Account);
		const user = await AccountRepo.findOne(payload.userID, {
			relations: ['apiKey', 'posts'],
		});

		if (!user)
			return res.status(403).json({
				ok: false,
				message: 'the owner of the token was not found',
			});

		req.user = user; // Insert the user in order to be used by controllers

		next();
	} catch (e) {
		return res.status(500).json({
			ok: false,
			message: e.message,
		});
	}
};

export const isAuthApiKey = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['x-api-key'] as string;

	if (!authHeader)
		return res.status(401).json({
			ok: false,
			message: 'unauthorized',
		});

	const ApiKeyRepo = getRepository(ApiKey);

	try {
		const apiKey = await ApiKeyRepo.findOne(authHeader, {
			relations: ['owner', 'owner.posts', 'owner.apiKey'],
		});

		if (!apiKey)
			return res.status(401).json({
				ok: false,
				message: 'the key is invalid',
			});

		if (apiKey.remainingMontlyCall === 0)
			return res.status(401).json({
				ok: false,
				message: 'no more calls for this month',
			});

		req.user = apiKey.owner;

		next();

		apiKey.remainingMontlyCall--;

		await ApiKeyRepo.save(apiKey);
	} catch (e) {
		return res.status(500).json({
			ok: false,
			message: e.message,
		});
	}
};

export const authLevel = (level: Values<typeof AUTHORIZATION_LEVEL>) => {
	if (AUTHORIZATION_LEVEL.MEMBER >= level && AUTHORIZATION_LEVEL.ADMIN <= level) {
		// Validate that AUTHORIZATION_LEVEL is a valid value
		throw new Error(
			`level must be between ${AUTHORIZATION_LEVEL.MEMBER} and ${AUTHORIZATION_LEVEL.ADMIN}`,
		);
	}

	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user as Account;

		if (!user)
			return res.status(401).json({
				ok: false,
				message: 'unauthorized',
			});

		if (user.role < level)
			return res.status(403).json({
				ok: false,
				message: 'not enough permission',
			});

		next();
	};
};
