import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebClientModule } from './webclient/WebClientModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      cache: true,
    }),
    WebClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
