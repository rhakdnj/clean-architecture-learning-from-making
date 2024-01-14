import { BaseEntity } from '@app/common';
import { Column, Entity } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateValueTransformer } from '@app/common/database/util/DateTimeValueTransformer';
import { timestamp } from 'rxjs';

@Entity('activity')
export class ActivityEntity extends BaseEntity<ActivityEntity> {
  @Column()
  private readonly _ownerAccountId: number;

  @Column()
  private readonly _sourceAccountId: number;

  @Column()
  private readonly _targetAccountId: number;

  @Column()
  private readonly _amount: number;

  @Column({
    type: 'datetime',
    name: 'timestamp',
    transformer: new LocalDateValueTransformer(),
  })
  private readonly _timestamp: LocalDateTime;

  constructor(
    id: number,
    ownerAccountId: number,
    sourceAccountId: number,
    targetAccountId: number,
    amount: number,
    timestamp: LocalDateTime,
  ) {
    super(id ?? null);
    this._ownerAccountId = ownerAccountId;
    this._sourceAccountId = sourceAccountId;
    this._targetAccountId = targetAccountId;
    this._amount = amount;
    this._timestamp = timestamp;
  }

  get ownerAccountId(): number {
    return this._ownerAccountId;
  }

  get sourceAccountId(): number {
    return this._sourceAccountId;
  }

  get targetAccountId(): number {
    return this._targetAccountId;
  }

  get amount(): number {
    return this._amount;
  }

  get timestamp(): LocalDateTime {
    return this._timestamp;
  }
}
