import { getRepository } from 'typeorm';

import { Event } from '../../entity/event';

export default {
	getEvents: async (req, res) => {
		const eventRepo = getRepository(Event);

		const events = await eventRepo.find();

		res.status(200).json({
			events,
		});
	},
	getEvent: async (req, res) => {},
	createEvent: async (req, res) => {},
	updateEvent: async (req, res) => {},
	deleteEvent: async (req, res) => {},
};
