import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GridWsModule } from './grid-ws/grid-ws.module';

@Module({
  imports: [GridWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
