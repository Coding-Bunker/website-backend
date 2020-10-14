import supertest from 'supertest';
import * as faker from 'faker';
import { verify } from 'jsonwebtoken';
import * as _ from 'lodash';

import app from '../../app';
import { createDbConnection, closeDbConnection } from '../../db';
import { hashPassword } from '../../utils/auth';
import { Account } from '../../entity/account';

import { createMockUser, saveMockUser, deleteMockUser } from '../mocks/functions';

describe('Routes - /auth/login', () => {
	const request = supertest(app);
	let mockUser: Account;
	let mockSavedUser: Account;

	beforeAll(async done => {
		try {
			await createDbConnection();

			mockSavedUser = createMockUser();
			mockUser = _.cloneDeep(mockSavedUser);

			const hashedPw = await hashPassword(mockUser.password);
			mockSavedUser.password = hashedPw;

			await saveMockUser(mockSavedUser);

			done();
		} catch (e) {
			done.fail(e.message);
		}
	});

	afterAll(async done => {
		try {
			await deleteMockUser(mockSavedUser);
			await closeDbConnection();

			done();
		} catch (e) {
			done.fail(e.message);
		}
	});

	it('sould return 200 with existing user with rigth email and password', async done => {
		const response = await request
			.post('/api/v1/auth/login')
			.send({
				email: mockUser.email,
				password: mockUser.password,
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200);

		expect(response.body.user).toStrictEqual(JSON.parse(JSON.stringify(mockSavedUser)));

		// Check that is a valid token
		try {
			const payload = verify(response.body.access_token, process.env.JWT_ACCESS_TOKEN_SECRET);
			expect(payload).toBeInstanceOf(Object);
		} catch (e) {
			done.fail(e.message);
		}

		done();
	});

	it('sould return 400 with unexisting user with given email', done => {
		request
			.post('/api/v1/auth/login')
			.send({
				email: faker.internet.email(),
				password: mockUser.password,
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(
				400,
				{
					ok: false,
					message: 'user not found',
				},
				done,
			);
	});

	it('sould return 400 with the wrong password', done => {
		request
			.post('/api/v1/auth/login')
			.send({
				email: mockUser.email,
				password: faker.internet.password(10),
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(
				400,
				{
					ok: false,
					message: 'email or password are invalid',
				},
				done,
			);
	});
});
