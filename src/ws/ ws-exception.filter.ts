import { Catch, ArgumentsHost } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient()

    // Gửi thông báo lỗi về client
    client.emit('error', {
      status: 'error',
      message: exception instanceof WsException ? exception.getError() : 'Internal server error'
    })

    // Optional: log lỗi ra console
    console.error('WebSocket Error:', exception)
  }
}
