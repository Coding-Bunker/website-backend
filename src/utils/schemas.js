import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
	email: Yup.string().email(),
	password: Yup.string().min(6).max(18),
});
