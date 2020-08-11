import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('project')
export class Project {
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
}
