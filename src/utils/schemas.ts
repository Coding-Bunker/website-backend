import * as Yup from 'yup';

import { AUTHORIZATION_LEVEL } from '../constants';

export const userAuthSchema = Yup.object().shape({
	email: Yup.string().email('Has to be an email').required('Email is required'),
	password: Yup.string()
		.min(6, 'Min 6 characters')
		.max(18, 'Max 18 characters')
		.required('Password is required'),
});

export const userSchema = Yup.object().shape({
	email: Yup.string().email('Has to be an email'),
	password: Yup.string().min(6, 'Min 6 characters').max(18, 'Max 18 characters'),
	firstName: Yup.string(),
	lastName: Yup.string(),
	role: Yup.string().oneOf([
		AUTHORIZATION_LEVEL.ADMIN,
		AUTHORIZATION_LEVEL.MODERATOR,
		AUTHORIZATION_LEVEL.DEVELOPER,
		AUTHORIZATION_LEVEL.DONATOR,
		AUTHORIZATION_LEVEL.MEMBER,
	]),
});

export const postSchema = Yup.object().shape({
	title: Yup.string().min(10, 'Min 10 characters').max(100, 'Max 100 characters'),
	content_html: Yup.string(),
	content_markdown: Yup.string(),
	owner: Yup.string(),
	attachment: Yup.string(),
});

export const contributorSchema = Yup.object().shape({
	money: Yup.string().min(0, 'Has to be major or equal to 0'),
	role: Yup.number(),
	date: Yup.date(),
});

export const locationSchema = Yup.object().shape({
	name: Yup.string().max(50, 'Max 50 words'),
	lat: Yup.number(),
	long: Yup.number(),
});

export const eventSchema = Yup.object().shape({
	name: Yup.string().min(10, 'Min 10 characters').max(100, 'Max 100 characters'),
	description: Yup.string().max(250, 'Max 250 characters'),
	date: Yup.date(),
	location: Yup.string(),
	link: Yup.string().max(256, 'Max 256 characters'),
});

export const projectSchema = Yup.object().shape({
	name: Yup.string().min(10, 'Min 10 characters').max(100, 'Max 100 characters'),
	description: Yup.string().max(250, 'Max 250 characters'),
	date: Yup.date(),
});

export const attachmentSchema = Yup.object().shape({
	name: Yup.string().max(100, 'Max 50 characters'),
	url: Yup.string().max(512, 'Max 512 characters'),
	post: Yup.string(),
});

export const everyFieldRequiredSchema = (schema: Yup.ObjectSchema<any>) =>
	schema.test('everyFieldRequired', 'Every fields is required', function (item) {
		const schemaNodes: string[] = Object.keys((this.schema as Yup.ObjectSchema<any>).fields);

		const isValid = schemaNodes.map(key => !!item[key]).reduce((acc, value) => acc && value);

		return isValid;
	});

export const partiallyRequiredSchema = (schema: Yup.ObjectSchema<any>) =>
	schema.test('atLeastOneFieldRequired', 'At least one field is required', function (item) {
		const schemaNodes: string[] = Object.keys((this.schema as Yup.ObjectSchema<any>).fields);

		const isValid = schemaNodes.map(key => !!item[key]).find(value => value) || false;

		return isValid;
	});
