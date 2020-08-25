import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import { UUIDRegExp } from '../utils';

export const schemaValidation = (schema: Yup.ObjectSchema<any>) => async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body = await schema.validate(req.body); // Sanificate Body
		next();
	} catch (e) {
		return res.status(400).json({
			ok: false,
			message: e.message,
		});
	}
};

export const checkUUIDParam = (paramToTest: string) => (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const parameter = req.params[paramToTest];

	if (UUIDRegExp.test(parameter)) next();
	else
		res.status(400).json({
			ok: false,
			message: `Parameter "${parameter}" is not a UUID`,
		});
};
