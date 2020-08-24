import { Response } from 'express';
import { compare } from 'bcryptjs';
import * as faker from 'faker';
import { getRepository } from 'typeorm';

import {
	sendRefreshToken,
	getAuthLevel,
	hashPassword,
	associateApiKeyToAccount,
} from '../../utils/auth';
import { AUTHORIZATION_LEVEL } from '../../constants';
import { createDbConnection, closeDbConnection } from '../../db';
import { Account } from '../../entity/account';
import { ApiKey } from '../../entity/apiKey';

import { createMockUser, saveMockUser, deleteMockUser } from '../mocks/functions';

describe('Utils - Auth', () => {
	describe('sendRefreshToken', () => {
		const responseMock = {
			cookie: jest.fn(),
		};
		const mockToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.RleytVilYY9Lq-8qNFZpfl_3M_cpaOOT3DNCzAoN92c';
		it('Works', () => {
			sendRefreshToken(responseMock as any, mockToken);

			expect(responseMock.cookie.mock.calls.length).toBe(1);
			expect(responseMock.cookie.mock.calls[0][1]).toBe(mockToken);
			expect(responseMock.cookie.mock.calls[0][2]).toStrictEqual({
				httpOnly: true,
				path: '/auth/refresh_token',
			});
		});
	});

	describe('getAuthLevel', () => {
		it('Works with existing account role', () => {
			const mockAccount: any = {
				role: AUTHORIZATION_LEVEL.ADMIN,
			};
			const result = getAuthLevel(mockAccount);

			expect(result).toBe('ADMIN');
		});

		it('Return "Member" with uncorrect role', () => {
			const mockAccount: any = {
				role: -1,
			};
			const result = getAuthLevel(mockAccount);

			expect(result).toBe('MEMBER');
		});
	});

	describe('hashPassword', () => {
		it('Compare the password', async done => {
			const mockPassowrd = faker.internet.password();

			const result = await hashPassword(mockPassowrd);

			expect(await compare(mockPassowrd, result)).toBe(true);

			done();
		});
	});

	describe('associateApiKeyToAccount', () => {
		let mockAccount: Account;

		beforeAll(async done => {
			try {
				await createDbConnection();

				done();
			} catch (e) {
				done.fail(e.message);
			}
		});

		afterAll(async done => {
			try {
				await closeDbConnection();

				done();
			} catch (e) {
				done.fail(e.message);
			}
		});

		beforeEach(async done => {
			try {
				mockAccount = createMockUser();
				mockAccount = await saveMockUser(mockAccount);

				done();
			} catch (e) {
				done.fail(e);
			}
		});

		afterEach(async done => {
			try {
				await deleteMockUser(mockAccount);

				done();
			} catch (e) {
				done.fail(e);
			}
		});

		it('sould associate user to a new api_key', async done => {
			const apiKey = await associateApiKeyToAccount(mockAccount);
			const AccountRepo = getRepository(Account);

			try {
				const accountWithRelation = await AccountRepo.findOne(mockAccount.id, {
					relations: ['apiKey'],
				});

				if (!accountWithRelation) return done.fail('account does not exists');

				expect(accountWithRelation.apiKey).not.toBeNull();
				expect(accountWithRelation.apiKey).toBeInstanceOf(ApiKey);

				done();
			} catch (e) {
				done.fail(e);
			}
		});
	});
});
