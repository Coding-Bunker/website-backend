export const schemaValidation = schema => async (req, res, next) => {
	try {
		req.body = await schema.validate(req.body); // Sanificate Body
	} catch (e) {
		return res.status(400).json(e.message);
	}
	next();
};
