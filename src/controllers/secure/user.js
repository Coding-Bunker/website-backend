import { getRepository } from 'typeorm';

import { Account } from '../../entity/account';

export default {
	getUsers: async (req, res) => {
		const AccountRepo = getRepository(Account);

		const accounts = await AccountRepo.find();

		res.status(200).json({
			accounts,
		});
	},
	getUser: async (req, res) => {},
	createUser: async (req, res) => {},
	updateUser: async (req, res) => {},
	deleteUser: async (req, res) => {},
};
