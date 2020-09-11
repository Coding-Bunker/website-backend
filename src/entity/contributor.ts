import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { Account } from './account';
import { Contributors } from '../types';

@Entity('contributor')
export class Contributor extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('int', {
		nullable: true,
	})
	money: number;

	@Column({
		type: 'enum',
		enum: Contributors.Roles,
		default: Contributors.Roles.DONATOR,
	})
	role: Contributors.Roles;

	@Column('date', {
		nullable: false,
	})
	date: Date;
}
