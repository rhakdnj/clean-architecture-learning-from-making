import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ResponseSpec {
  constructor(
    private readonly _statusCode: number,
    private readonly _body: string,
  ) {}

  toInstance<T>(clazz: ClassConstructor<T>): T {
    return plainToInstance(clazz, this._body);
  }

  get statusCode() {
    return this._statusCode;
  }

  get rawBody(): string {
    return this._body;
  }
}
