import { classToPlain } from 'class-transformer';
import { BaseEntity } from 'typeorm';

export abstract class AppBaseEntity extends BaseEntity {
	toJson() {
		return classToPlain(this);
	}
}
