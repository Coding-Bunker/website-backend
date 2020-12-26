import * as _ from 'lodash';
import { Request, Response } from 'express';

import { Event } from '../../entity/event';

export default {
	getEvents: async (req: Request, res: Response) => {
		try {
			const events = await Event.find({
				relations: ['location', 'speakers'],
			});

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

		try {
			const event = await Event.findOne(eventID, {
				relations: ['location', 'speakers'],
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
		try {
			const newEvent = Event.create({
				...(req.body as Partial<Event>),
			});

			await newEvent.save();

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

		try {
			const eventToUpdate = await Event.findOne(eventID);

			if (!eventToUpdate)
				return res.status(400).json({
					ok: false,
					message: 'Event not found',
				});

			_.assign(req.body, eventToUpdate);

			await eventToUpdate.save();

			res.status(200).json({
				ok: true,
				event: eventToUpdate,
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
		try {
			await Event.delete(eventID);

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
