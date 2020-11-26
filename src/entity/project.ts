import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

@Entity('project')
export class Project extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 250,
		nullable: false,
	})
	description: string;

	@Column('date', {
		nullable: false,
	})
	date: string;
}
