import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient()
    const token = client.handshake.auth?.token

    if (!token) {
      throw new WsException('Unauthorized: No token provided')
    }

    // TODO: Thay đoạn này bằng logic verify token thật, ví dụ gọi service verify hoặc jwt.verify
    // if (token !== 'valid-token-example') {
    //   throw new WsException('Unauthorized: Invalid token')
    // }

    // Gắn user info vào client (nếu cần)
    // client.user = { userId: 123, username: 'testuser' };

    return true
  }
}
