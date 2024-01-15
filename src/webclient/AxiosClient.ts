import { ContentType, BodyInserter } from './BodyInserter';
import { ResponseSpec } from './ResponseSpec';
import { WebClient } from './WebClient';
import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

export class AxiosClient implements WebClient {
  private static readonly TIMEOUT = 10_000;

  private readonly _option: AxiosRequestConfig;

  constructor(url?: string, timeout = AxiosClient.TIMEOUT) {
    this._option = {
      method: 'GET',
      url,
      timeout,
    };
  }

  header(headers: Record<string, string>): this {
    this._option.headers = headers;
    return this;
  }

  params(param: Record<string, string>): this {
    this._option.params = param;
    return this;
  }

  url(url: string): this {
    this._option.url = url;
    return this;
  }

  get(): this {
    this._option.method = 'GET';
    return this;
  }

  post(): this {
    this._option.method = 'POST';
    return this;
  }

  put(): this {
    this._option.method = 'HEAD';
    return this;
  }

  patch(): this {
    this._option.method = 'PATCH';
    return this;
  }

  delete(): this {
    this._option.method = 'DELETE';
    return this;
  }

  head(): this {
    this._option.method = 'HEAD';
    return this;
  }

  options(): this {
    this._option.method = 'OPTIONS';
    return this;
  }

  contentType(contentType: ContentType): this {
    this._option.headers = {
      ...this._option.headers,
      'Content-Type': contentType,
    };

    return this;
  }

  body<T>(inserter: BodyInserter<T>): this {
    switch (inserter.mediaType) {
      case ContentType.APPLICATION_JSON:
        this._option.data = JSON.stringify(inserter.data);
        return this;
      case ContentType.APPLICATION_FORM_URLENCODED:
        this._option.data = stringify(inserter.data);
        return this;
      case ContentType.TEXT_PLAIN:
        this._option.data = inserter.data;
        return this;
      default:
        throw new Error('Unsupported media type');
    }
  }

  async retrieve(): Promise<ResponseSpec> {
    const response = await axios({
      ...this._option,
    });

    return new ResponseSpec(response.status, response.data);
  }
}
