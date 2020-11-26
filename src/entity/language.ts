import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

@Entity('language')
export class Language extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;
}
