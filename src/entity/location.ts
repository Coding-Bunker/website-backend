import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Location extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('double precision')
	lat: number;

	@Column('double precision')
	long: number;
}
