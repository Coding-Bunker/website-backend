import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

import { Event } from './event';
import { Location } from './location';

@Entity('speaker')
export class Speaker extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 100,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		nullable: false,
	})
	imgUrl: string;
}
