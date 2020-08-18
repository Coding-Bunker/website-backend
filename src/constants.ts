import { Auhorization } from './types';

export const AUTHORIZATION_LEVEL: Auhorization.Constants<number> = {
	MEMBER: 0,
	DONATOR: 1,
	MODERATOR: 2,
	DEVELOPER: 3,
	ADMIN: 4,
};

export const API_KEY_CALL_LIMIT: Auhorization.Constants<number> = {
	MEMBER: 50,
	DONATOR: 150,
	MODERATOR: -1,
	DEVELOPER: -1,
	ADMIN: -1,
};
