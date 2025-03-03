import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GridWsModule } from './grid-ws/grid-ws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GridWsModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
