import { v4 as uuidV4 } from 'uuid'

export abstract class Entity<Props = any> {
  private readonly _id: string
  public readonly props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id || uuidV4()
  }

  get id(): string {
    return this._id
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & Props>
  }
}
