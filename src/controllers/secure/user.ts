import { Request, Response } from 'express';

import { Account } from '../../entity/account';
import { hashPassword } from '../../utils/auth';

export default {
	getUsers: async (req: Request, res: Response) => {
		try {
			const accounts = await Account.find({
				relations: ['apiKey', 'posts'],
			});

			return res.status(200).json({
				accounts,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getUser: async (req: Request, res: Response) => {
		const userID = req.params.id; // It exists because it passed trough the middleware

		try {
			const account = await Account.findOne(userID, {
				relations: ['apiKey', 'posts'],
			});

			return res.status(200).json({
				account,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	createUser: async (req: Request, res: Response) => {
		try {
			const hash = await hashPassword(req.body.password);
			const newAccount = Account.create({
				...(req.body as Partial<Account>),
				password: hash,
			});

			await newAccount.save();

			res.status(201).json({
				ok: true,
				account: newAccount,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	updateUser: async (req: Request, res: Response) => {
		const userID = req.params.id; // It exists because it passed trough the middleware

		try {
			const accountToUpdate = await Account.findOne(userID);

			if (!accountToUpdate)
				return res.status(400).json({
					ok: false,
					message: 'User not found',
				});

			res.status(200).json({
				ok: true,
				account: accountToUpdate,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deleteUser: async (req: Request, res: Response) => {
		const userID = req.params.id; // It exists because it passed trough the middleware

		try {
			await Account.delete(userID);

			res.status(200).json({
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
};
