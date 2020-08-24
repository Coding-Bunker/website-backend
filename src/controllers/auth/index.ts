import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

import { Account } from '../../entity/account';
import { ApiKey } from '../../entity/apiKey';
import { sendRefreshToken } from '../../utils/auth';
import { createAccessToken, createRefreshToken } from '../../utils/token';
import { getAuthLevel, hashPassword, associateApiKeyToAccount } from '../../utils/auth';
import { API_KEY_CALL_LIMIT, AUTHORIZATION_LEVEL } from '../../constants';
import { Tokens } from '../../types';
import logger from '../../configs/logger';

export default {
	login: async (req: Request, res: Response) => {
		const { email, password } = req.body;

		try {
			const AccountRepo = getRepository(Account);

			const user = await AccountRepo.findOne({
				where: {
					email: email,
				},
			});

			if (!user)
				return res.status(400).json({
					ok: false,
					message: 'user not found',
				});

			if (!compareSync(password, user.password))
				return res.status(400).json({
					ok: false,
					message: 'email or password are invalid',
				});

			sendRefreshToken(res, createRefreshToken(user));

			res.status(200).json({
				user,
				access_token: createAccessToken(user),
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	register: async (req: Request, res: Response) => {
		const { email, password } = req.body;

		try {
			const AccountRepo = getRepository(Account);
			const alreadyRegisteredUser = await AccountRepo.findOne({
				where: {
					email,
				},
			});

			if (alreadyRegisteredUser)
				return res.status(400).json({
					ok: false,
					message: 'user already exists',
				});

			const hashedPassword = await hashPassword(password);

			await AccountRepo.insert({
				email,
				password: hashedPassword,
			});

			res.status(201).json({
				ok: true,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	logout: async (req: Request, res: Response) => {
		sendRefreshToken(res, '');

		res.status(200).json({
			ok: true,
		});
	},
	refreshToken: async (req: Request, res: Response) => {
		const token: string | undefined = req.cookies.jid;

		if (!token)
			return res.status(400).json({
				ok: false,
				message: 'refresh_token is missing',
			});

		let payload: Tokens.RefreshTokenPayload;

		try {
			payload = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as Tokens.RefreshTokenPayload;
		} catch (e) {
			return res.status(400).json({
				ok: false,
				message: 'invalid token',
			});
		}

		const AccountRepo = getRepository(Account);
		const user = await AccountRepo.findOne({
			where: {
				id: payload.userID,
			},
		});

		if (!user)
			return res.status(400).json({
				ok: false,
				message: 'the owner of the token was not found',
			});

		if (user.tokenVersion !== payload.tokenVersion)
			return res.status(400).json({
				ok: false,
				message: '',
			});

		sendRefreshToken(res, createRefreshToken(user));

		res.status(200).json({
			ok: true,
			access_token: createAccessToken(user),
		});
	},
	genApiKey: async (req: Request, res: Response) => {
		const user = req.user as Account;

		if (user.apiKey)
			return res.status(400).json({
				ok: false,
				message: 'user already have an api key',
			});

		try {
			const apiKey = await associateApiKeyToAccount(user);

			res.status(201).json({
				ok: true,
				api_key: apiKey.id,
			});
		} catch (e) {
			logger.error({
				label: 'DB',
				message: e.message,
			});

			res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
};
