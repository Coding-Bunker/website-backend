import supertest from 'supertest';
import * as faker from 'faker';

import app from '../../app';
import { authLevel, isAuth, isAuthApiKey, isAuthJWT } from '../../middlewares/auth';
import { createDbConnection, closeConnection } from '../../db';
import { Account } from '../../entity/account';
import { createAccessToken } from '../../utils/token';

import { createMockUser, saveMockUser, deleteMockUser } from '../mocks/functions';

describe('Middlewares - Auth', () => {
	describe('isAuthJWT', () => {
		let mockUser: Account;
		let token: string;

		let mockRequest: any;
		let mockResponse: any;
		let mockNext: any;

		beforeAll(async done => {
			try {
				await createDbConnection();

				mockUser = createMockUser();

				mockUser = await saveMockUser(mockUser);

				done();
			} catch (e) {
				done.fail(e.message);
			}
		});

		afterAll(async done => {
			try {
				await closeConnection();

				await deleteMockUser(mockUser);
			} catch (e) {
				done.fail(e.message);
			}
		});

		beforeEach(() => {
			token = createAccessToken(mockUser);

			mockRequest = {
				headers: {
					authorization: `Bearer ${token}`,
				},
				user: null,
			};

			mockResponse = {
				status: jest.fn(() => mockResponse),
				json: jest.fn(() => mockResponse),
			};

			mockNext = jest.fn();
		});

		afterEach(() => {
			mockRequest = null;
			mockResponse = null;
			mockNext = null;
		});

		it('should work with correct token associated with a user', async done => {
			await isAuthJWT(mockRequest, mockResponse, mockNext);

			expect(mockNext.mock.calls.length).toBe(1);
			expect(mockRequest.user).toEqual({
				...mockUser,
				posts: [],
				apiKey: null,
			});

			done();
		});

		it('sould return 401 with unset authorization header', async done => {
			delete mockRequest.headers.authorization;

			await isAuthJWT(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status.mock.calls.length).toBe(1);
			expect(mockResponse.json.mock.calls.length).toBe(1);

			expect(mockResponse.status.mock.calls[0][0]).toBe(401);
			expect(mockResponse.json.mock.calls[0][0]).toEqual({
				ok: false,
				message: 'unauthorized',
			});

			done();
		});

		it('sould return 401 with invalid token passed', async done => {
			mockRequest.headers.authorization = `Bearer ${faker.random.alphaNumeric(10)}`;

			await isAuthJWT(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status.mock.calls.length).toBe(1);
			expect(mockResponse.json.mock.calls.length).toBe(1);

			expect(mockResponse.status.mock.calls[0][0]).toBe(401);
			expect(mockResponse.json.mock.calls[0][0]).toEqual({
				ok: false,
				message: 'token invalid',
			});

			done();
		});

		it('sould return 403 if userID is not associated to an existing user', async done => {
			mockRequest.headers.authorization = `Bearer ${createAccessToken({
				id: faker.random.uuid(),
			} as any)}`;

			await isAuthJWT(mockRequest, mockResponse, mockNext);

			expect(mockResponse.status.mock.calls.length).toBe(1);
			expect(mockResponse.json.mock.calls.length).toBe(1);

			expect(mockResponse.status.mock.calls[0][0]).toBe(403);
			expect(mockResponse.json.mock.calls[0][0]).toEqual({
				ok: false,
				message: 'the owner of the token was not found',
			});

			done();
		});
	});
});
