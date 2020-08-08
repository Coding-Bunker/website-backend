import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Post } from './post';

@Entity('account')
export class Account extends BaseEntity {
	@PrimaryGeneratedColumn()
	id = undefined;

	@Column({
		type: 'enum',
		enum: ['admin', 'developer', 'moderator', 'donator', 'member'],
		default: 'member',
	})
	role = 'member';

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

	@Column('int', {
		default: 0,
	})
	tokenVersion = 0;

	@OneToMany(type => Post)
	posts = undefined;
}
