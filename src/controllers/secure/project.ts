import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Project } from '../../entity/project';

export default {
	getProjects: async (req: Request, res: Response) => {
		const ProjectRepo = getRepository(Project);

		const projects = await ProjectRepo.find();

		try {
			res.status(200).json({
				projects,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getProject: async (req: Request, res: Response) => {
		const projectID = req.params.id;

		const ProjectRepo = getRepository(Project);

		try {
			const project = await ProjectRepo.findOne(projectID);

			return res.status(200).json({
				project,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	createProject: async (req: Request, res: Response) => {
		const ProjectRepo = getRepository(Project);

		try {
			const newProject = ProjectRepo.create({
				...req.body,
			});

			await ProjectRepo.insert(newProject);

			res.status(201).json({
				ok: true,
				project: newProject,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	updateProject: async (req: Request, res: Response) => {
		const projectID = req.params.id;
		const ProjectRepo = getRepository(Project);

		try {
			await ProjectRepo.update(projectID, req.body);

			const updatedProject = await ProjectRepo.findOne(projectID);

			res.status(200).json({
				ok: true,
				project: updatedProject,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deleteProject: async (req: Request, res: Response) => {
		const projectID = req.params.id;
		const ProjectRepo = getRepository(Project);

		try {
			await ProjectRepo.delete(projectID);

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
