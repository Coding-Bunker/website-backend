import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('date')
	date = undefined;
}
