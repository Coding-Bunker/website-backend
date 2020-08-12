import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Account } from './account';

@Entity('contributor')
export class Contributor {
	@PrimaryGeneratedColumn()
	id = undefined;

	@Column('int', {
		nullable: true,
	})
	money = undefined;

	@Column({
		type: 'enum',
		enum: ['donatore', 'staff'],
		default: 'donatore',
	})
	role = undefined;

	@Column('date', {
		nullable: false,
	})
	date = undefined;

	@OneToOne(type => Account)
	@JoinColumn({
		name: 'account_id',
	})
	idAcc = undefined;
}
