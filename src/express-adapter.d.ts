import AdminBro, { CurrentAdmin } from 'admin-bro';
import { Router } from 'express';
import { ExpressFormidableOptions } from 'express-formidable';
import { SessionOptions } from 'express-session';

declare module '@admin-bro/express' {
	type AuthOptions = {
		authenticate: (email: string, password: string) => CurrentAdmin | null;
		cookiePassword: string;
		cookieName: string;
	};

	declare const buildRouter: (
		admin: AdminBro,
		predefinedRouter?: Router,
		formidableOptions?: ExpressFormidableOption,
	) => Router;

	declare const buildAuthenticatedRouter: (
		admin: AdminBro,
		auth: AuthOptions,
		predefinedRouter?: Router,
		sessionOptions?: SessionOptions,
		formidableOptions?: ExpressFormidableOption,
	) => Router;

	export = { buildRouter, buildAuthenticatedRouter, AuthOptions };
}
