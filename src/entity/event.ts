import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from 'typeorm';

import { Location } from './location';

@Entity('event')
export class Event extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 250,
		nullable: false,
	})
	description: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;

	@OneToOne(type => Location)
	location: Location;

	@Column('varchar', {
		length: 256,
		nullable: false,
	})
	link: string;
}
