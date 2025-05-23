import { UseFilters, UseGuards } from '@nestjs/common'
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { WsJwtAuthGuard } from 'src/jwt/guards/ws.guard'
import { WsExceptionFilter } from 'src/ws/ ws-exception.filter'

@WebSocketGateway(5001, { transports: ['websocket'], namespace: 'event' })
@UseFilters(WsExceptionFilter)
@UseGuards(WsJwtAuthGuard)
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private map = new Map()
  afterInit(server: Server) {
    console.log('Initialized')
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected')
    await client.join('phong_cho')
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected')
  }

  // server tong cua socket
  @WebSocketServer()
  server: Server

  @SubscribeMessage('join_room')
  // @UseGuards(WsJwtAuthGuard)
  handleJoinRoom(client: Socket, name: string) {
    console.log('name', name)

    //client id laf ma id cua cai nguoi dung
    // de xu ly logic sau
    this.map.set(client.id, name)
    // tra ve tin nhan la nguoi name da join vao
    // client nay don gian la clien cua nguoi dung goi toi backend
    //client.join('room1');
    client.emit('joined', name)
    // server tong nay se emit tin hieu toi cho tat ca moi nguoi
    this.server.to('phong_cho').emit('co_nguoi_vao', name)

    this.server.to(this.map.get(client.id)).emit('co_nguoi_vao', name)
  }
}
