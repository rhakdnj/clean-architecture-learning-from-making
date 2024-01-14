import { BaseEntity } from '@app/common';
import { Entity } from 'typeorm';

@Entity('account')
export class AccountEntity extends BaseEntity<AccountEntity> {}
