import { Repository, EntityRepository } from 'typeorm';

import { Account } from '../entity/account';

@EntityRepository(Account)
export class AccountRepo extends Repository {
	dropUserConnection(user) {
		return user.update({
			tokenVersion: user.tokenVersion + 1,
		});
	}

	async dropEveryUserConnection() {
		const users = await this.find();

		await Promise.all(users.map(this.dropUserConnection));
	}
}
