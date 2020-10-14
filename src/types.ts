export namespace Auhorization {
	export type Tiers = 'MEMBER' | 'DONATOR' | 'MODERATOR' | 'DEVELOPER' | 'ADMIN';

	export type Constants<T> = Record<Tiers, T>;
}

export namespace Contributors {
	export enum Roles {
		DONATOR = 'donator',
		STAFF = 'staff',
	}
}

export namespace Tokens {
	export type AccessTokenPayload = {
		userID: string;
	};
	export type RefreshTokenPayload = {
		userID: string;
		tokenVersion: number;
	};
}

export type Keys<T> = keyof T;
export type Values<T> = T[keyof T];

export type Log = {
	label?: string;
	message: string;
};

declare global {
	const __DEV__: boolean;

	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			DB_URI: string;
			JWT_ACCESS_TOKEN_SECRET: string;
			JWT_REFRESH_TOKEN_SECRET: string;
			NODE_ENV: 'development' | 'production' | 'testing';
		}
		interface Global {
			__DEV__: boolean;
		}
	}
	namespace Express {
		interface Request {
			user: unknown;
		}
	}
}
