import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

@Entity()
export class Location extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 50,
	})
	name: string;

	@Column('double precision')
	lat: number;

	@Column('double precision')
	long: number;
}
