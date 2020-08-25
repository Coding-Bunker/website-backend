import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('double precision')
	lat: number;

	@Column('double precision')
	long: number;
}
