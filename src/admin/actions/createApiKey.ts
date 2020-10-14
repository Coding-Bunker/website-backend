import { RecordActionResponse } from 'admin-bro';

import { Account } from '../../entity/account';

import { associateApiKeyToAccount } from '../../utils/auth';

export default async (request, response, ctx): Promise<RecordActionResponse> => {
	const accountId = ctx.record?.param('id');

	if (!accountId)
		return {
			notice: {
				type: 'error',
				message: 'account not found',
			},
			record: ctx.record!.toJSON(ctx.currentAdmin),
		};
	try {
		const account = await Account.findOne(accountId);

		if (!account)
			return {
				notice: {
					type: 'error',
					message: 'Account not found',
				},
				record: ctx.record!.toJSON(ctx.currentAdmin),
			};

		if (account.apiKeyId)
			return {
				notice: {
					type: 'error',
					message: 'Api Key already registered',
				},
				record: ctx.record!.toJSON(ctx.currentAdmin),
			};

		await associateApiKeyToAccount(account);

		const newResource = await ctx.resource.findOne(account.id);

		if (!newResource) throw new Error('Resource not found by adminbro');

		return {
			notice: {
				type: 'success',
				message: 'Api Key created',
			},
			record: newResource.toJSON(ctx.currentAdmin),
			redirectUrl: ctx.h.resourceUrl({
				resourceId: ctx.resource._decorated?.id() || ctx.resource.id(),
			}),
		};
	} catch (e) {
		return {
			notice: {
				type: 'error',
				message: e.message,
			},
			record: ctx.record!.toJSON(ctx.currentAdmin),
		};
	}
};
