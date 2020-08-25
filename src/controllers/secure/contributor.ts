import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Contributor } from '../../entity/contributor';

export default {
	getContributors: async (req: Request, res: Response) => {
		const ContributorRepo = getRepository(Contributor);

		const contributors = await ContributorRepo.find({
			relations: ['idAcc'],
		});

		try {
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

		const ContributorRepo = getRepository(Contributor);

		try {
			const contributor = await ContributorRepo.findOne(contributorID, {
				relations: ['idAcc'],
			});

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
		const ContributorRepo = getRepository(Contributor);

		try {
			const newContributor = ContributorRepo.create({
				...req.body,
			});

			await ContributorRepo.insert(newContributor);

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
		const ContributorRepo = getRepository(Contributor);

		try {
			await ContributorRepo.update(contributorID, req.body);

			const updatedContributor = await ContributorRepo.findOne(contributorID);

			res.status(200).json({
				ok: true,
				project: updatedContributor,
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
		const ContributorRepo = getRepository(Contributor);

		try {
			await ContributorRepo.delete(contributorID);

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
