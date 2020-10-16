import { Request, Response } from 'express';

import { Location } from '../../entity/location';

export default {
	getLocations: async (req: Request, res: Response) => {
		try {
			const locations = await Location.find();

			res.status(200).json({
				locations,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getLocation: async (req: Request, res: Response) => {
		const locationID = req.params.id;

		try {
			const location = await Location.findOne(locationID);

			return res.status(200).json({
				location,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	createLocation: async (req: Request, res: Response) => {
		try {
			const newLocation = Location.create({
				...req.body,
			});

			await Location.insert(newLocation);

			res.status(201).json({
				ok: true,
				post: newLocation,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	updateLocation: async (req: Request, res: Response) => {
		const locationID = req.params.id;

		try {
			const locationToUpdate = await Location.findOne(locationID);

			if (!locationToUpdate)
				return res.status(400).json({
					ok: false,
					message: 'Location not found',
				});

			await locationToUpdate.save();

			res.status(200).json({
				ok: true,
				post: locationToUpdate,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deleteLocation: async (req: Request, res: Response) => {
		const locationID = req.params.id;
		try {
			await Location.delete(locationID);

			res.status(200).json({
				ok: true,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
};
