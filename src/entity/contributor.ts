import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { Contributors } from '../types';
import { KIND_OF_CONTIBUTORS } from '../constants';
import { Language } from './language';

@Entity('contributor')
export class Contributor extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	picture: string;

	@Column('varchar')
	username: string;

	@Column('varchar')
	description: string;

	@Column('varchar')
	job: string;

	@Column({
		type: 'enum',
		enum: KIND_OF_CONTIBUTORS,
		default: KIND_OF_CONTIBUTORS.JUNIOR_MEMBER,
	})
	role: Contributors.Roles;

	@ManyToMany(() => Language)
	@JoinTable()
	languages: Language[];

	@Column('varchar')
	city: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;
}
