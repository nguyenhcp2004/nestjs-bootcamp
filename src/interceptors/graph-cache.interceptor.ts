import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GqlIdCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const gqlCtx = GqlExecutionContext.create(context)
    const args = gqlCtx.getArgs<{ id?: string | number }>()
    const id = args?.id

    const cacheMetadata = this.reflector.get<string>(CACHE_KEY_METADATA, context.getHandler())

    if (!cacheMetadata || id === undefined) return undefined

    return `${cacheMetadata}:${id}`
  }
}
