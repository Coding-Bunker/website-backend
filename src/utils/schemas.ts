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
	role: Yup.number()
		.min(
			AUTHORIZATION_LEVEL.MEMBER,
			`Role has to be beetwen ${AUTHORIZATION_LEVEL.MEMBER} and ${AUTHORIZATION_LEVEL.ADMIN}`,
		)
		.max(
			AUTHORIZATION_LEVEL.ADMIN,
			`Role has to be beetwen ${AUTHORIZATION_LEVEL.MEMBER} and ${AUTHORIZATION_LEVEL.ADMIN}`,
		),
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
