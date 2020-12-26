import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

@Entity()
export class Location extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 50,
		nullable: false,
	})
	name: string;

	@Column('double precision', {
		nullable: false,
	})
	lat: number;

	@Column('double precision', {
		nullable: false,
	})
	long: number;
}
