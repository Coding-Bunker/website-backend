import { compareSync, genSalt, hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

import { Account } from '../../entity/account';
import { sendRefreshToken } from '../../utils/auth';
import { createAccessToken, createRefreshToken } from '../../utils/token';
import { registerSchema } from '../../utils/schemas';

export default {
	login: async (req, res) => {
		const { email, password } = req.body;

		if (!email)
			return res.status(400).json({
				ok: false,
				message: 'email is missing',
			});

		if (!password)
			return res.status(400).json({
				ok: false,
				message: 'password is missing',
			});

		try {
			const user = await Account.findOne({
				where: {
					email: email,
				},
			});

			if (!user)
				return res.status(404).json({
					ok: false,
					message: 'user not found',
				});

			if (!compareSync(password, user.password))
				return res.status(400).json({
					ok: false,
					message: 'password is wrong',
				});

			sendRefreshToken(res, createRefreshToken(user));

			res.status(200).json({
				user,
				access_token: createAccessToken(user),
			});
		} catch (e) {
			console.error(e.message);

			return res.status(500).json({
				ok: false,
				message: e.message,
			});
		}
	},
	register: async (req, res) => {
		const { email, password } = req.body;

		try {
			await registerSchema.isValid({
				email,
				password,
			});
		} catch (e) {
			return res.status(400).json({
				ok: false,
				message: e.message,
			});
		}

		const alreadyRegisteredUser = await Account.findOne({
			where: {
				email,
			},
		});

		if (alreadyRegisteredUser)
			return res.status(400).json({
				ok: false,
				message: 'user already exists',
			});

		const salt = await genSalt(10);
		const hashedPassword = await hash(password, salt);

		await Account.insert({
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			ok: true,
		});
	},
	logout: async (req, res) => {
		sendRefreshToken(res, '');

		res.status(200).json({
			ok: true,
		});
	},
	refreshToken: async (req, res) => {
		const token = req.cookies.jid;

		if (!token)
			return res.status(400).json({
				ok: false,
				message: 'refresh_token is missing',
			});

		let payload;

		try {
			payload = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
		} catch (e) {
			return res.status(400).json({
				ok: false,
				message: 'invalid token',
			});
		}

		const user = await Account.findOne({
			where: {
				id: payload.userId,
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
};
