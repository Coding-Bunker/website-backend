import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn } from 'typeorm';

import { Account } from './account';
import { API_KEY_CALL_LIMIT } from '../constants';

@Entity('api_key')
export class ApiKey {
	@PrimaryGeneratedColumn('uuid')
	id;

	@OneToOne(type => Account, owner => owner.apiKey)
	owner = undefined;

	@Column('int', {
		default: API_KEY_CALL_LIMIT.MEMBER,
		name: 'remaining_montly_call',
	})
	remainingMontlyCall = 0;

	@CreateDateColumn({
		name: 'created_at',
	})
	createdAt = undefined;
}
