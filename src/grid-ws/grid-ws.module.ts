import { Module } from '@nestjs/common';
import { GridWsService } from './grid-ws.service';
import { GridWsGateway } from './grid-ws.gateway';

@Module({
  providers: [GridWsGateway, GridWsService],
})
export class GridWsModule {}
