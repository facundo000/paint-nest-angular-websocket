import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GridWsService } from './grid-ws.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class GridWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gridWsService: GridWsService) {    }

  @WebSocketServer() server: Server;
  private gridState: Record<number, string | null> = {};

  handleConnection(client: Socket) {
    // Enviar estado inicial al cliente
    client.emit('initial-grid', this.gridState);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('update-cell')
  handleCellUpdate(client: Socket, data: { id: number; color: string | null }) {
    // Actualizar estado
    this.gridState[data.id] = data.color || null;
    
    // Broadcast a todos los clientes
    this.server.emit('cell-updated', data);
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway inicializado');
  }
}
