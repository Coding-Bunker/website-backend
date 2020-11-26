import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, RelationId } from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

import { Post } from './post';

@Entity('attachment')
export class Attachment extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 50,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		nullable: false,
		length: 512,
	})
	url: string;

	@ManyToOne(type => Post)
	post: Post;

	@RelationId((attachment: Attachment) => attachment.post)
	postId: string;
}
