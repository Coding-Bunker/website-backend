import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	CreateDateColumn,
	BaseEntity,
} from 'typeorm';

import { AppBaseEntity } from '../repositories/AppBaseEntity';

import { Account } from './account';

import { API_KEY_CALL_LIMIT } from '../constants';
import { Values } from '../types';

@Entity('api_key')
export class ApiKey extends AppBaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(type => Account, owner => owner.apiKey)
	owner: Account;

	@Column({
		type: 'int',
		default: API_KEY_CALL_LIMIT.MEMBER,
		name: 'remaining_montly_call',
	})
	remainingMontlyCall: Values<typeof API_KEY_CALL_LIMIT>;

	@CreateDateColumn({
		name: 'created_at',
	})
	createdAt: Date;
}
