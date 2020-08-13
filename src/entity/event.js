import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { Location } from './location';

@Entity('event')
export class Event {
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name = '';

	@Column('varchar', {
		length: 250,
		nullable: false,
	})
	description = '';

	@Column('date', {
		nullable: false,
	})
	date = undefined;

	@OneToOne(type => Location)
	@JoinColumn()
	location = undefined;

	@Column('varchar', {
		length: 256,
		nullable: false,
	})
	link = '';
}
