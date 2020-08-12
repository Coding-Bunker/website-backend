import { getRepository } from 'typeorm';

import { Post } from '../../entity/post';

export default {
	getPosts: async (req, res) => {
		const postRepo = getRepository(Post);

		const posts = await postRepo.find();

		res.status(200).json({
			posts,
		});
	},
	getPost: async (req, res) => {},
	createPost: async (req, res) => {},
	updatePost: async (req, res) => {},
	deletePost: async (req, res) => {},
};
