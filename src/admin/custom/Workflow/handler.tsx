import { PageContext, PageHandler } from 'admin-bro';
import { Octokit } from '@octokit/rest';

import { GITHUB_OWNER, GITHUB_REPO, GITHUB_REF, WORKFLOW_NAME } from '../../../configs/github';

export const handler: PageHandler = async (request: any, response: any, ctx: PageContext) => {
	const octokit = new Octokit({
		auth: process.env.WORKFLOW_API_TOKEN,
	});

	const res = await octokit.actions.createWorkflowDispatch({
		owner: GITHUB_OWNER,
		repo: GITHUB_REPO,
		workflow_id: WORKFLOW_NAME as any,
		ref: GITHUB_REF,
	});

	console.log(res.data);
};
