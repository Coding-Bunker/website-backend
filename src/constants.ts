import { Auhorization } from './types';

export const AUTHORIZATION_LEVEL: Auhorization.Constants<string> = {
	MEMBER: 'member',
	DONATOR: 'donator',
	MODERATOR: 'moderator',
	DEVELOPER: 'developer',
	ADMIN: 'admin',
};

export const API_KEY_CALL_LIMIT: Auhorization.Constants<number> = {
	MEMBER: 50,
	DONATOR: 150,
	MODERATOR: -1,
	DEVELOPER: -2,
	ADMIN: -3,
};
