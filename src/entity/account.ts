import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	CreateDateColumn,
	JoinColumn,
} from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';
import { ApiKey } from './apiKey';
import { Post } from './post';

import { AUTHORIZATION_LEVEL } from '../constants';
import { Values } from '../types';

@Entity('account')
export class Account extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'enum',
		enum: AUTHORIZATION_LEVEL,
		default: AUTHORIZATION_LEVEL.MEMBER,
	})
	role: Values<typeof AUTHORIZATION_LEVEL>;

	@Column('varchar', {
		length: 50,
		nullable: true,
	})
	email: string;

	@Column('varchar', {
		nullable: true,
		length: 256,
	})
	password: string;

	@Column('varchar', {
		nullable: true,
		length: 24,
	})
	firstName?: string;

	@Column('varchar', {
		nullable: true,
		length: 24,
	})
	lastName?: string;

	@OneToMany(type => Post, post => post.owner)
	posts: Post[];

	@Column('int', {
		default: 0,
		name: 'token_version',
	})
	tokenVersion: number;

	@OneToOne(type => ApiKey, apiKey => apiKey.owner, {
		nullable: true,
	})
	@JoinColumn()
	apiKey: ApiKey;

	@CreateDateColumn({
		name: 'created_at',
	})
	createdAt: Date;

	@Column({ nullable: true })
	apiKeyId: string;
}
