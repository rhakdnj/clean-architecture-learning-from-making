import * as Buffer from 'buffer';

export enum ContentType {
  APPLICATION_JSON = 'application/json',
  APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded',
  TEXT_PLAIN = 'text/plain',
}

export class BodyInserter<T> {
  private constructor(
    private readonly _mediaType: ContentType,
    private readonly _data: T,
  ) {}

  static fromJSON(json: Record<string, unknown>) {
    return new BodyInserter(ContentType.APPLICATION_JSON, json);
  }

  static fromFormData(form: Record<string, unknown>) {
    return new BodyInserter(ContentType.APPLICATION_FORM_URLENCODED, form);
  }

  static fromText(text: string | Buffer) {
    return new BodyInserter(ContentType.TEXT_PLAIN, text);
  }

  get mediaType(): ContentType {
    return this._mediaType;
  }

  get data(): T {
    return this._data;
  }
}
