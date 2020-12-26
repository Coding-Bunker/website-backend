import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

import { Language } from './language';

import { Contributors } from '../types';
import { KIND_OF_CONTIBUTORS } from '../constants';

@Entity('contributor')
export class Contributor extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		nullable: false,
	})
	picture: string;

	@Column('varchar', {
		nullable: false,
	})
	username: string;

	@Column('varchar', {
		nullable: false,
	})
	description: string;

	@Column('varchar', {
		nullable: true,
	})
	job: string;

	@Column({
		type: 'enum',
		enum: KIND_OF_CONTIBUTORS,
		default: KIND_OF_CONTIBUTORS.JUNIOR_MEMBER,
	})
	role: Contributors.Roles;

	@ManyToMany(() => Language, {
		cascade: true,
	})
	@JoinTable()
	languages: Language[];

	@Column('varchar', {
		nullable: true,
	})
	city: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;
}
