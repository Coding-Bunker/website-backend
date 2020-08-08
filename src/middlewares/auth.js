import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Account } from '../entity/account';

export const isAuth = async (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader)
		return res.status(401).json({
			ok: false,
			message: 'authorization token is missing',
		});

	let payload;
	try {
		const token = authHeader.split(' ')[1];

		payload = verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
	} catch (e) {
		return res.status(401).json({
			ok: false,
			message: 'token invalid',
		});
	}

	try {
		const userRepo = await getRepository(Account);
		const user = await userRepo.findOne(payload.userId);

		if (!user)
			return res.status(403).json({
				ok: false,
				message: 'the owner of the token was not found',
			});

		req.user = user;

		next();
	} catch (e) {
		return res.status(500).json({
			ok: false,
			message: e.message,
		});
	}
};
