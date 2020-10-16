import { Request, Response } from 'express';

import { Project } from '../../entity/project';

export default {
	getProjects: async (req: Request, res: Response) => {
		try {
			const projects = await Project.find();

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

		try {
			const project = await Project.findOne(projectID);

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
		try {
			const newProject = Project.create({
				...(req.body as Partial<Project>),
			});

			await newProject.save();

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

		try {
			const projectToUpdate = await Project.findOne(projectID);

			if (!projectToUpdate)
				return res.status(400).json({
					ok: false,
					message: 'Project not found',
				});

			await projectToUpdate.save();

			res.status(200).json({
				ok: true,
				project: projectToUpdate,
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

		try {
			await Project.delete(projectID);

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
