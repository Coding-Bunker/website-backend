import { verify } from 'jsonwebtoken';
import { isMainThread } from 'worker_threads';
import { createAccessToken, createRefreshToken } from '../../utils/token';

describe('Utils - Token', () => {
	const mockUser: any = {
		id: 'kfgekfskofkspo',
		tokenVersion: 1,
	};

	describe('createAccessToken', () => {
		it('Generate valid token', () => {
			const token = createAccessToken(mockUser);

			verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
		});
	});

	describe('createRefreshToken', () => {
		it('Generate valid token', () => {
			const token = createRefreshToken(mockUser);

			verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
		});
	});
});
