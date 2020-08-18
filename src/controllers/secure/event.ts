import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Event } from '../../entity/event';

export default {
	getEvents: async (req: Request, res: Response) => {
		const EventRepo = getRepository(Event);

		const events = await EventRepo.find({
			relations: ['location'],
		});
		try {
			res.status(200).json({
				events,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getEvent: async (req: Request, res: Response) => {
		const eventID = req.params.id;

		const EventRepo = getRepository(Event);

		try {
			const event = await EventRepo.findOne(eventID, {
				relations: ['location'],
			});

			return res.status(200).json({
				event,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	createEvent: async (req: Request, res: Response) => {
		const EventRepo = getRepository(Event);

		try {
			const newEvent = EventRepo.create({
				...req.body,
			});

			await EventRepo.insert(newEvent);

			res.status(201).json({
				ok: true,
				event: newEvent,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	updateEvent: async (req: Request, res: Response) => {
		const eventID = req.params.id; // It exists because it passed trough the middleware
		const EventRepo = getRepository(Event);

		try {
			await EventRepo.update(eventID, req.body);

			const updatedEvent = await EventRepo.findOne(eventID);

			res.status(200).json({
				ok: true,
				event: updatedEvent,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deleteEvent: async (req: Request, res: Response) => {
		const eventID = req.params.id;
		const EventRepo = getRepository(Event);

		try {
			await EventRepo.delete(eventID);

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
