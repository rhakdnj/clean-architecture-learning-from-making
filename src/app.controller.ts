import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WebClientService } from './webclient/WebClientService';
import { BodyInserter, ContentType } from './webclient/BodyInserter';

export class Todo {
  title: number;
  body: number;
  userId: string;
  id: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly webClientService: WebClientService,
  ) {}

  @Get()
  async getHello(): Promise<void> {
    const result = await this.webClientService
      .create('https://jsonplaceholder.typicode.com/posts')
      .post()
      .contentType(ContentType.APPLICATION_JSON)
      .body(BodyInserter.fromJSON({ title: 'foo', body: 'bar', userId: 1 }))
      .retrieve()
      .then((response) => response.toInstance(Todo));

    console.log(result);
  }
}
