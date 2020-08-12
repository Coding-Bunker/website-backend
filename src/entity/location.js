import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
	@PrimaryGeneratedColumn()
	id = undefined;

	@Column('date')
	date = undefined;
}
