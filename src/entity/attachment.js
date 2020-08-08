import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Post } from './post';

@Entity('attachment')
export class Attachment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id = undefined;

	@Column('varchar', {
		length: 50,
		nullable: false,
	})
	name = '';

	@Column('varchar', {
		nullable: false,
		length: 512,
	})
	url = '';

	@ManyToOne(type => Post)
	post = undefined;
}
