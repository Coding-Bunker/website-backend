import { Repository, EntityRepository } from 'typeorm';

import { Account } from '../entity/account';

@EntityRepository(Account)
export class AccountRepo extends Repository<Account> {
	dropUserConnection(user: Account) {
		return this.update(user.id, {
			tokenVersion: user.tokenVersion + 1,
		});
	}

	async dropEveryUserConnection() {
		const users = await this.find();

		await Promise.all(users.map(this.dropUserConnection));
	}
}
