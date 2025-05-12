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
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor'
import { UsergraphModule } from './graphql/usergraph/usergraph.module'
import authConfig from '@/api/auth/config/auth-config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

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
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    UsergraphModule
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // }
  ]
})
export class AppModule {}
