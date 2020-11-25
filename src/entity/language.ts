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

import { Contributor } from './contributor';

@Entity('language')
export class Language extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;

	@ManyToMany(() => Contributor, category => category.languages, {
		cascade: true,
	})
	@JoinTable()
	categories: Contributor[];
}
