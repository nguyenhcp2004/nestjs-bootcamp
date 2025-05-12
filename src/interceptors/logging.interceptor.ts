/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name)

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const userAgent = request.get('user-agent') || ''
    const { ip, method, path: url } = request

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name} invoked...`
    )

    const now = Date.now()
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse()

        const { statusCode } = response
        const contentLength = response.get('content-length')

        this.logger.log(`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${Date.now() - now}ms`)
        this.logger.debug('Response:', res)
      }),
      catchError((err) => {
        this.logger.error(err)
        return throwError(() => err)
      })
    )
  }
}
