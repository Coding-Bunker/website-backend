import { getRepository } from 'typeorm';

import { Account } from '../../entity/account';
import { hashPassword } from '../../utils/auth';

export default {
	getUsers: async (req, res) => {
		const AccountRepo = getRepository(Account);

		try {
			const accounts = await AccountRepo.find({
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
	getUser: async (req, res) => {
		const userID = req.params.id; // It exists because it passed trough the middleware

		const AccountRepo = getRepository(Account);

		try {
			const account = await AccountRepo.findOne(userID, {
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
	createUser: async (req, res) => {
		const AccountRepo = getRepository(Account);

		try {
			const hash = await hashPassword(req.body.password);
			const newAccount = AccountRepo.create({
				...req.body,
				password: hash,
			});

			await AccountRepo.insert(newAccount);

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
	updateUser: async (req, res) => {
		const userID = req.params.id; // It exists because it passed trough the middleware
		const AccountRepo = getRepository(Account);

		try {
			await AccountRepo.update(userID, req.body);

			const updatedAccount = await AccountRepo.findOne(userID);

			res.status(200).json({
				ok: true,
				account: updatedAccount,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deleteUser: async (req, res) => {
		const userID = req.params.id; // It exists because it passed trough the middleware
		const AccountRepo = getRepository(Account);

		try {
			await AccountRepo.delete(userID);

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
