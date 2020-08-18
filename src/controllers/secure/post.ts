import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Post } from '../../entity/post';

export default {
	getPosts: async (req: Request, res: Response) => {
		const PostRepo = getRepository(Post);

		const posts = await PostRepo.find({
			relations: ['attachment', 'owner'],
		});
		try {
			res.status(200).json({
				posts,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	getPost: async (req: Request, res: Response) => {
		const postID = req.params.id;

		const PostRepo = getRepository(Post);

		try {
			const post = await PostRepo.findOne(postID, {
				relations: ['attachment', 'owner'],
			});

			return res.status(200).json({
				post,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	createPost: async (req: Request, res: Response) => {
		const PostRepo = getRepository(Post);

		try {
			const newPost = PostRepo.create({
				...req.body,
			});

			await PostRepo.insert(newPost);

			res.status(201).json({
				ok: true,
				post: newPost,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	updatePost: async (req: Request, res: Response) => {
		const postID = req.params.id;
		const PostRepo = getRepository(Post);

		try {
			await PostRepo.update(postID, req.body);

			const updatedPost = await PostRepo.findOne(postID);

			res.status(200).json({
				ok: true,
				post: updatedPost,
			});
		} catch (e) {
			console.error(e);

			return res.status(500).json({
				ok: false,
				message: 'internal error',
			});
		}
	},
	deletePost: async (req: Request, res: Response) => {
		const postID = req.params.id;
		const PostRepo = getRepository(Post);

		try {
			await PostRepo.delete(postID);

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
