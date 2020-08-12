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
	getUser: async (req, res) => {},
	createUser: async (req, res) => {},
	updateUser: async (req, res) => {},
	deleteUser: async (req, res) => {},
};
