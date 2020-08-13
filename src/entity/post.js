import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './account';
import { Attachment } from './attachment';

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	title = '';

	@Column('varchar', {
		nullable: false,
	})
	content = '';

	@ManyToOne(type => Account, owner => owner.posts)
	owner = undefined;
}
