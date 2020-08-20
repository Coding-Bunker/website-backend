import { Response } from 'express';
import { compare } from 'bcryptjs';

import { sendRefreshToken, getAuthLevel, hashPassword } from '../../utils/auth';
import { AUTHORIZATION_LEVEL } from '../../constants';

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
			const mockPassowrd = 'fjeifjsfej';

			const result = await hashPassword(mockPassowrd);

			expect(await compare(mockPassowrd, result)).toBe(true);

			done();
		});
	});
});
