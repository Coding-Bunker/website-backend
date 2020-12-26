import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

import { Location } from './location';
import { Speaker } from './speaker';

@Entity('event')
export class Event extends AppBaseEntity {
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

	@Column('varchar', {
		length: 256,
		nullable: false,
	})
	link: string;

	@Column('boolean', {
		nullable: false,
	})
	hasEnded: boolean;

	@Column('varchar', {
		nullable: true,
	})
	bgImage: string;

	@ManyToMany(type => Speaker, {
		cascade: true,
	})
	@JoinTable()
	speakers: Speaker[];

	@OneToOne(type => Location)
	@JoinColumn()
	location: Location;

	@Column('varchar', { nullable: true })
	locationId: string;
}
