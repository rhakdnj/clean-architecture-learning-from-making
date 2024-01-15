import { BodyInserter, ContentType } from './BodyInserter';
import { ResponseSpec } from './ResponseSpec';

export interface WebClient {
  get(): this;

  head(): this;

  post(): this;

  put(): this;

  patch(): this;

  delete(): this;

  options(): this;

  url(uri: string): this;

  header(param: Record<string, string>): this;

  params(param: Record<string, string>): this;

  contentType(mediaType: ContentType): this;

  body<T>(inserter: BodyInserter<T>): this;

  retrieve(): Promise<ResponseSpec>;
}
