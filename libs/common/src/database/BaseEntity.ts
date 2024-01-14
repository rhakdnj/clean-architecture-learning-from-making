import { PrimaryColumn } from 'typeorm';

export class BaseEntity<T> {
  @PrimaryColumn()
  private readonly _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }
}
