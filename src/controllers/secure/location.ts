import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Location } from '../../entity/location';

export default {
	getLocations: async (req: Request, res: Response) => {
		const LocationRepo = getRepository(Location);

		const locations = await LocationRepo.find();

		try {
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

		const LocationRepo = getRepository(Location);

		try {
			const location = await LocationRepo.findOne(locationID);

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
		const LocationRepo = getRepository(Location);

		try {
			const newLocation = LocationRepo.create({
				...req.body,
			});

			await LocationRepo.insert(newLocation);

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
		const LocationRepo = getRepository(Location);

		try {
			await LocationRepo.update(locationID, req.body);

			const updatedLocation = await LocationRepo.findOne(locationID);

			res.status(200).json({
				ok: true,
				post: updatedLocation,
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
		const LocationRepo = getRepository(Location);

		try {
			await LocationRepo.delete(locationID);

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
