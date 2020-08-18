import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Account } from './account';
import { Attachment } from './attachment';

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	title: string;

	@Column('varchar', {
		nullable: false,
	})
	content: string;

	@ManyToOne(type => Account, owner => owner.posts)
	owner: string;

	@OneToMany(type => Attachment, attachment => attachment.post)
	attachment: Attachment[];
}
