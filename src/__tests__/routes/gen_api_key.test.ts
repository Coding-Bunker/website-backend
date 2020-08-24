import supertest from 'supertest';

import app from '../../app';
import { Account } from '../../entity/account';
import { ApiKey } from '../../entity/apiKey';
import { createDbConnection, closeDbConnection } from '../../db';
import { UUIDRegExp } from '../../utils';
import { createAccessToken } from '../../utils/token';
import { associateApiKeyToAccount } from '../../utils/auth';

import {
	createMockUser,
	saveMockUser,
	deleteMockUser,
	deleteApiKeyFromId,
} from '../mocks/functions';

describe('Routes /auth/generate_api_key', () => {
	const request = supertest(app);
	let mockUser: Account;
	let token: string;
	let mockApiKeyID: string | null;

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
			mockUser = createMockUser();
			mockUser = await saveMockUser(mockUser);
			mockApiKeyID = null;
			token = `Bearer ${createAccessToken(mockUser)}`;

			done();
		} catch (e) {
			done.fail(e);
		}
	});

	afterEach(async done => {
		try {
			await deleteMockUser(mockUser);

			if (mockApiKeyID) await deleteApiKeyFromId(mockApiKeyID);
			done();
		} catch (e) {
			done.fail(e);
		}
	});

	it('sould return 200 with a user without api_key generated', async done => {
		const res = await request
			.post('/api/v1/auth/generate_api_key')
			.set('Accept', 'application/json')
			.set('Authorization', token)
			.expect('Content-Type', /json/)
			.expect(201);
		expect(res.body.ok).toBeTruthy();
		expect(typeof res.body.api_key).toBe('string');
		expect(res.body.api_key).toMatch(UUIDRegExp);

		mockApiKeyID = res.body.api_key;

		done();
	});

	it('should return 400 if the user has already an api_key', async done => {
		const apiKey = await associateApiKeyToAccount(mockUser);

		mockApiKeyID = apiKey.id;
		request
			.post('/api/v1/auth/generate_api_key')
			.set('Accept', 'application/json')
			.set('Authorization', token)
			.expect('Content-Type', /json/)
			.expect(
				400,
				{
					ok: false,
					message: 'user already have an api key',
				},
				done,
			);
	});
});
