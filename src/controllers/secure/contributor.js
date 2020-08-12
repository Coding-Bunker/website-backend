import { getRepository } from 'typeorm';

import { Contributor } from '../../entity/contributor';

export default {
	getContributors: async (req, res) => {
		const ContributorRepo = getRepository(Contributor);

		const contributors = await ContributorRepo.find();

		res.status(200).json({
			contributors,
		});
	},
	getContributor: async (req, res) => {},
	createContributor: async (req, res) => {},
	updateContributor: async (req, res) => {},
	deleteContributor: async (req, res) => {},
};
