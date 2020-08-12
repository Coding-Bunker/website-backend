import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';

import { ApiKey } from './apiKey';
import { Post } from './post';

@Entity('account')
export class Account {
	@PrimaryGeneratedColumn()
	id = undefined;

	@Column('int', {
		default: 0,
	})
	role = 0;

	@Column('varchar', {
		length: 50,
		nullable: true,
	})
	email = '';

	@Column('varchar', {
		nullable: true,
		length: 256,
	})
	password = '';

	@Column('varchar', {
		nullable: true,
		length: 24,
	})
	name = '';

	@Column('varchar', {
		nullable: true,
		length: 24,
	})
	surname = '';

	@OneToMany(type => Post, post => post.owner)
	posts = undefined;

	@Column('int', {
		default: 0,
		name: 'token_version',
	})
	tokenVersion;

	@OneToOne(type => ApiKey, apiKey => apiKey.owner, {
		nullable: true,
	})
	@JoinColumn({
		name: 'api_key_id',
	})
	apiKey = undefined;

	@CreateDateColumn({
		name: 'created_at',
	})
	createdAt;
}
