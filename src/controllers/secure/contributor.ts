import * as _ from 'lodash';
import { Request, Response } from 'express';

import { Contributor } from '../../entity/contributor';

export default {
	getContributors: async (req: Request, res: Response) => {
		try {
			const contributors = await Contributor.find({
				relations: ['languages'],
			});

			res.status(200).json({
				contributors,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getContributor: async (req: Request, res: Response) => {
		const contributorID = req.params.id;

		try {
			const contributor = await Contributor.findOne(contributorID);

			return res.status(200).json({
				contributor,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	createContributor: async (req: Request, res: Response) => {
		try {
			const newContributor = Contributor.create({
				...(req.body as Partial<Contributor>),
			});

			await newContributor.save();

			res.status(201).json({
				ok: true,
				project: newContributor,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	updateContributor: async (req: Request, res: Response) => {
		const contributorID = req.params.id;

		try {
			const contributorToUpdate = await Contributor.findOne(contributorID);

			if (!contributorToUpdate)
				return res.status(400).json({
					ok: false,
					message: 'Contributor does not exists',
				});

			_.assign(req.body, contributorToUpdate);
			await contributorToUpdate.save();

			res.status(200).json({
				ok: true,
				project: contributorToUpdate,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deleteContributor: async (req: Request, res: Response) => {
		const contributorID = req.params.id;

		try {
			await Contributor.delete(contributorID);

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
