import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import authController from './auth';
import secureController from './secure';

import { Account } from '../entity/account';

export default {
	newsletters: async (req: Request, res: Response) => {
		const { email, name, surname } = req.body;
		const AccountRepo = getRepository(Account);

		if (!email)
			return res.status(400).json({
				ok: false,
				message: 'email missing',
			});

		if (!name)
			return res.status(400).json({
				ok: false,
				message: 'name missing',
			});

		if (!surname)
			return res.status(400).json({
				ok: false,
				message: 'surname missing',
			});

		try {
			const checkEmailExistance = await AccountRepo.find({
				select: ['email'],
				where: {
					email: email,
				},
			});

			if (checkEmailExistance.length)
				return res.status(400).json({
					ok: false,
					message: 'email already exists',
				});
		} catch (e) {
			console.error('[ERROR]', e.message);
			return;
		}

		try {
			await AccountRepo.save({
				email,
				name,
				surname,
			});
		} catch (e) {
			console.error('[ERROR]', e.message);
			return;
		}

		res.status(201).json({
			ok: true,
			message: 'user created',
		});
	},
	auth: authController,
	secure: secureController,
};
