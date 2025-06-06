/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './api/auth/auth.module'
import { UserModule } from './api/user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from 'src/database/config/database-config'
import mongoConfig from 'src/database/config/mongooes-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AllConfigType } from 'src/config/config.type'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmConfigService } from 'src/database/typeorm-config.service'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor'
import { UsergraphModule } from './graphql/usergraph/usergraph.module'
import authConfig from '@/api/auth/config/auth-config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { BullModule } from 'src/background/bull.module'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { createKeyv, Keyv } from '@keyv/redis'
import { EventModule } from 'src/ws'
import { HealthzModule } from './api/healthz/healthz.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [databaseConfig, mongoConfig, authConfig],
      cache: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        return {
          uri: `mongodb://${configService.getOrThrow('mongo.username', {
            infer: true
          })}:${configService.getOrThrow('mongo.password', {
            infer: true
          })}@${configService.getOrThrow('mongo.host', {
            infer: true
          })}:${configService.getOrThrow('mongo.port', {
            infer: true
          })}/${configService.getOrThrow('mongo.database', {
            infer: true
          })}?authSource=admin`
        }
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //auto schema tu dong taoj ra schema file co ten la schema.gql
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true
      }
    }),
    EventModule,
    UsergraphModule,
    BullModule.forRoot({
      isGlobal: true
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [createKeyv('redis://default:redis@localhost:6379')]
        }
      }
    }),
    HealthzModule,
    ThrottlerModule.forRoot({
      throttlers: [{ limit: 1, ttl: 60000 }],
      storage: new ThrottlerStorageRedisService({
        host: 'localhost',
        port: 6379,
        password: 'redis'
      })
    })
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_PIPE,
    //   useClass: ZodValidationPipe
    // }
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // }
  ]
})
export class AppModule {}
