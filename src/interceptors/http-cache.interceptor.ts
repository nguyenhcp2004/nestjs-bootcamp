import { CacheInterceptor } from '@nestjs/cache-manager'
import { ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest()
    const { httpAdapter } = this.httpAdapterHost

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET'
    const excludePaths: string[] = [
      // Routes to be excluded
    ]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!isGetRequest || (isGetRequest && excludePaths.includes(httpAdapter.getRequestUrl(request)))) {
      return undefined
    }
    return httpAdapter.getRequestUrl(request)
  }
}
