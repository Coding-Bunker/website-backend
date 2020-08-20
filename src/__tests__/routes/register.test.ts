import supertest from 'supertest';
import { getRepository } from 'typeorm';

import app from '../../app';
import { createDbConnection, closeConnection } from '../../db';
import { Account } from '../../entity/account';

import { createMockUser, deleteMockUser } from '../mocks/functions';

describe('Routes - /auth/register', () => {
	const request = supertest(app);

	let mockUser: Account;

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
			await closeConnection();
			done();
		} catch (e) {
			done.fail(e.message);
		}
	});

	beforeEach(() => {
		mockUser = createMockUser();
	});

	afterEach(async done => {
		try {
			await deleteMockUser(mockUser);
			done();
		} catch (e) {
			done.fail(e.message);
		}
	});

	it('sould return 201 with new email and password', done => {
		request
			.post('/api/v1/auth/register')
			.send({
				email: mockUser.email,
				password: mockUser.password,
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201, done);
	});

	it('sould return 400 with already existing email', async done => {
		const AccountRepo = getRepository(Account);

		await AccountRepo.save({
			email: mockUser.email,
		});

		request
			.post('/api/v1/auth/register')
			.send({
				email: mockUser.email,
				password: mockUser.password,
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(
				400,
				{
					ok: false,
					message: 'user already exists',
				},
				done,
			);
	});
});
