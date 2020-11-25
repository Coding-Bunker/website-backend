import { Auhorization, Contributors } from './types';

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

export const KIND_OF_CONTIBUTORS: Contributors.Constants<string> = {
	ADMIN: 'Admin',
	MODERATOR: 'Moderator',
	MENTOR: 'Mentor',
	CONTRIBUTOR: 'Contributor',
	SENIOR_MEMBER: 'Senior Member',
	MEMBER: 'Member',
	JUNIOR_MEMBER: 'Junior Member',
};
