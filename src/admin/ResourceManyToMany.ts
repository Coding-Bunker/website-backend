import { BaseRecord } from 'admin-bro';
import { Repository } from 'typeorm';
import { Resource as TypeOrmResource } from '@admin-bro/typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

export class Resource extends TypeOrmResource {
	private getManyToManyRelations() {
		const metadata = (<any>this).model.getRepository().metadata;

		return metadata.ownerManyToManyRelations;
	}

	private getClassOfManyToManyRelationsFromProperty(property: string) {
		const relations = this.getManyToManyRelations();

		return relations.find(r => r.propertyName === property).type;
	}

	public titleField() {
		return this.decorate().titleProperty().name();
	}

	public wrapObject(typeOrmInstances: AppBaseEntity[]) {
		return typeOrmInstances.map(i => new BaseRecord(i.toJson(), this));
	}

	public primaryKey(): string | undefined {
		const metadata = (<any>this).model.getRepository().metadata;
		return metadata.columns.find(c => c.isPrimary);
	}

	public async findRelated(record: BaseRecord, resourceId: string) {
		const model = (<any>this).model as typeof AppBaseEntity;
		const resourceClass = this.getClassOfManyToManyRelationsFromProperty(
			resourceId,
		) as typeof AppBaseEntity;

		const instance = await model.findOne(record.id(), {
			relations: [resourceId],
		});

		if (!instance) throw new Error('Instance not found');

		return instance[resourceId];
	}

	public async saveResource(record: BaseRecord, resourceId: string, ids: string[]) {
		const model = (<any>this).model as typeof AppBaseEntity;

		const resourceClass = this.getClassOfManyToManyRelationsFromProperty(
			resourceId,
		) as typeof AppBaseEntity;
		const resourceInstances = await resourceClass.findByIds(ids);

		const instance = await model.findOne(record.id());

		if (!instance) {
			throw new Error('Instance not found');
		}

		instance[resourceId] = resourceInstances;

		await instance.save();
	}

	public getManyProperties() {
		return this.decorate()
			.getProperties({ where: 'edit' })
			.filter(p => (p.type() as string) === 'many')
			.map(p => ({ name: p.name(), res: p.resource().getResourceName() }));
	}
}
