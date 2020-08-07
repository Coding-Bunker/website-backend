import { sign } from 'jsonwebtoken'

export const createAccessToken = user =>
	sign(
		{
			userId: user.id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '15m',
		},
	)

export const createRefreshToken = user =>
	sign(
		{
			userId: user.id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		},
	)
