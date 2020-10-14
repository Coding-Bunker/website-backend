import { getRepository } from 'typeorm';
import * as faker from 'faker';
import * as _ from 'lodash';

import { Account } from '../../entity/account';
import { ApiKey } from '../../entity/apiKey';

import { AUTHORIZATION_LEVEL } from '../../constants';

export const createMockUser = () => {
	const mockAccount = Account.create();
	mockAccount.firstName = faker.name.firstName();
	mockAccount.lastName = faker.name.lastName();
	mockAccount.email = faker.internet.email(mockAccount.firstName, mockAccount.lastName);
	mockAccount.password = faker.internet.password(10);
	mockAccount.role = AUTHORIZATION_LEVEL.MEMBER;

	return mockAccount;
};

export const saveMockUser = (account: Account) => {
	return account.save();
};

export const deleteMockUser = async (account: Account) => {
	const AccountRepo = getRepository(Account);

	await AccountRepo.delete(account.id);
};

export const deleteMockUserByEmail = async (email: string) => {
	const AccountRepo = getRepository(Account);

	await AccountRepo.delete({
		email,
	});
};

export const deleteApiKeyFromId = async (id: string) => {
	const ApiKeyRepo = getRepository(ApiKey);

	await ApiKeyRepo.delete(id);
};
