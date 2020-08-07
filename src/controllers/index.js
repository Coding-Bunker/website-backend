import { getRepository } from 'typeorm'

import { User } from '../entity/user'
import DbService from '../services/DbService'

export default {
	newsletters: async (req, res) => {
		const { email, name, surname } = req.body

		if (!email)
			return res.status(400).json({
				ok: false,
				message: 'email missing',
			})

		if (!name)
			return res.status(400).json({
				ok: false,
				message: 'name missing',
			})

		if (!surname)
			return res.status(400).json({
				ok: false,
				message: 'surname missing',
			})

		const UserRepo = DbService.getConnection().getRepository(User)

		try {
			const checkEmailExistance = await UserRepo.find({
				select: ['email'],
				where: {
					email: email,
				},
			})

			if (checkEmailExistance.length)
				return res.status(400).json({
					ok: false,
					message: 'email already exists',
				})
		} catch (e) {
			console.error('[ERROR]', e.message)
			return
		}

		try {
			await UserRepo.save({
				email,
				name,
				surname,
			})
		} catch (e) {
			console.error('[ERROR]', e.message)
			return
		}

		res.status(201).json({
			ok: true,
			message: 'user created',
		})
	},
}
