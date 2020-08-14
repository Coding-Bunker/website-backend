export const schemaValidation = schema => async (req, res, next) => {
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

export const checkUUIDParam = paramToTest => (req, res, next) => {
	const UUIDRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	const parameter = req.params[paramToTest];

	if (UUIDRegExp.test(parameter)) next();
	else
		res.status(400).json({
			ok: false,
			message: `Parameter "${parameter}" is not a UUID`,
		});
};
