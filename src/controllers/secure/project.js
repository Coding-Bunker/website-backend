import { getRepository } from 'typeorm';

import { Project } from '../../entity/project';

export default {
	getProjects: async (req, res) => {
		const projectRepo = getRepository(Project);

		const projects = await projectRepo.find();

		res.status(200).json({
			projects,
		});
	},
	getProject: async (req, res) => {},
	createProject: async (req, res) => {},
	updateProject: async (req, res) => {},
	deleteProject: async (req, res) => {},
};
