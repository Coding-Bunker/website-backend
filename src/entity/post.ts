import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	BaseEntity,
	RelationId,
} from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

import { Account } from './account';
import { Attachment } from './attachment';

@Entity('post')
export class Post extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
	})
	title: string;

	@Column('varchar')
	content: string;

	@Column('varchar')
	content_html: string;

	@Column('varchar')
	content_markdown: string;

	@ManyToOne(type => Account, owner => owner.posts)
	owner: Account;

	@OneToMany(type => Attachment, attachment => attachment.post)
	attachment: Attachment[];

	@RelationId((post: Post) => post.owner)
	ownerId: string;
}
