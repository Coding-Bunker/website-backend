import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event')
export class Event {
	@PrimaryGeneratedColumn()
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

	@Column('geography', {
		nullable: true,
	})
	location = undefined;

	@Column('varchar', {
		length: 256,
		nullable: false,
	})
	link = '';
}
