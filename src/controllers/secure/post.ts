import { Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';

import { Post } from '../../entity/post';
import { Account } from '../../entity/account';
import { parseMarkdown } from '../../utils/remark';

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
		const AccountRepo = getRepository(Account);
		const PostRepo = getRepository(Post);
		const user = req.user as Account;

		try {
			const contentMD: string = req.body.content;
			const contentHTML: string = parseMarkdown(contentMD);
			delete req.body.content;

			const newPost = PostRepo.create(req.body as DeepPartial<Post>);

			const savedPost = await PostRepo.save({
				...newPost,
				content_markdown: contentMD,
				content_html: contentHTML,
			});

			user.posts.push(savedPost);

			await AccountRepo.save(user);

			res.status(201).json({
				ok: true,
				post: savedPost,
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
			const toUpdate: DeepPartial<Post> = req.body;

			if (req.body.content) {
				toUpdate.content_markdown = req.body.content;
				toUpdate.content_html = parseMarkdown(req.body.content);

				delete req.body.content;
			}

			await PostRepo.update(postID, toUpdate);

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
