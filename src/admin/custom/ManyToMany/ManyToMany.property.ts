import AdminBro, {
	ActionContext,
	ActionRequest,
	After,
	BaseRecord,
	RecordActionResponse,
} from 'admin-bro';
import { unflatten, flatten } from 'flat';
import { Resource } from '../../ResourceManyToMany';

const setResponseItem = async (
	{ _admin, resource, record }: ActionContext,
	response: RecordActionResponse,
	toResourceId: string,
	resourceName: string,
) => {
	const toResource = _admin.findResource(resourceName) as Resource;
	const options = { order: [toResource.titleField()] };

	const throughItems = await (resource as Resource).findRelated(record as BaseRecord, toResourceId);
	const items = toResource.wrapObject(throughItems);

	if (items.length !== 0) {
		const primaryKey = toResource.primaryKey();

		response.record.populated = {
			...flatten(
				{
					[toResourceId]: items,
				},
				{ maxDepth: 2 },
			),
			...response.record.populated,
		};

		response.record.params[toResourceId] = items.map(i => i.params[primaryKey || 'id']);
	}
};

const afterHook: (resourceName: string) => After<RecordActionResponse> = (
	resourceName: string,
) => async (response: RecordActionResponse, request: ActionRequest, ctx: ActionContext) => {
	const resource: Resource = ctx.resource as Resource;

	if (request && request.method) {
		const manyProperties = resource.getManyProperties();
		if (request.method === 'get') {
			await Promise.all(
				manyProperties.map(async ({ name, res }) => {
					await setResponseItem(ctx, response, name, resourceName);
				}),
			);
		}

		const { record } = ctx;
		if (request.method === 'post' && record?.isValid()) {
			const params: object = unflatten(request.payload);

			await Promise.all(
				manyProperties.map(async ({ name, res }) => {
					const ids = params[name] ?? [];
					await resource.saveResource(record, name, ids);
				}),
			);
		}
	}
	return response;
};

export const makeManyToMany = (resourceName: string) => ({
	Actions: {
		edit: {
			after: afterHook(resourceName),
		},
		new: {
			after: afterHook(resourceName),
		},
		show: {
			after: afterHook(resourceName),
		},
	},
	Component: {
		type: 'many',
		components: {
			edit: AdminBro.bundle('./ManyToMany.edit.tsx'),
			show: AdminBro.bundle('./ManyToMany.show.tsx'),
		},
		custom: {
			resource: resourceName,
		},
		isVisible: {
			show: true,
			list: false,
			edit: true,
			filter: false,
		},
	},
});
