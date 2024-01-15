import { Global, Module } from '@nestjs/common';
import { WebClientService } from './WebClientService';
import { AxiosClientService } from './AxiosClientService';

@Global()
@Module({
  providers: [
    {
      provide: WebClientService,
      useClass: AxiosClientService,
    },
  ],
  exports: [WebClientService],
})
export class WebClientModule {}
