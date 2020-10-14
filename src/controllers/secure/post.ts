import { Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';
import * as _ from 'lodash';

import { Post } from '../../entity/post';
import { Account } from '../../entity/account';

export default {
	getPosts: async (req: Request, res: Response) => {
		const posts = await Post.find({
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
		const user = req.user as Account;

		try {
			const contentMD: string = req.body.content;
			delete req.body.content;

			const newPost = Post.create(req.body as DeepPartial<Post>);
			newPost.content_markdown = contentMD;

			await newPost.save();

			user.posts.push(newPost);

			await user.save();

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

		try {
			const toUpdate: DeepPartial<Post> = req.body;

			if (req.body.content) {
				toUpdate.content_markdown = req.body.content;

				delete req.body.content;
			}
			const postToUpdate = await Post.findOne(postID);

			if (!postToUpdate)
				return res.status(400).json({
					ok: false,
					message: 'Post not found',
				});

			_.assign(postToUpdate, toUpdate);

			await postToUpdate.save();

			res.status(200).json({
				ok: true,
				post: postToUpdate,
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
