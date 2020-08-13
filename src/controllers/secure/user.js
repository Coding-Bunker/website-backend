import { getRepository } from 'typeorm';

import { Account } from '../../entity/account';

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
		} catch (error) {
			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getUser: async (req, res) => {
		const userID = req.params.id;

		if (!userID)
			return res.status(400).json({
				ok: false,
				message: 'ID missing',
			});

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
		const { email, password, role, firstName, lastName } = req.body;
	},
	updateUser: async (req, res) => {},
	deleteUser: async (req, res) => {},
};
