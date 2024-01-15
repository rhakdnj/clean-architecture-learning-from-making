import { AxiosClient } from './AxiosClient';
import { WebClient } from './WebClient';
import { WebClientService } from './WebClientService';

export class AxiosClientService extends WebClientService {
  override create(url?: string): WebClient {
    return new AxiosClient(url);
  }
}
