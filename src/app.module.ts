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
import { DataSource, DataSourceOptions } from 'typeorm'

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [databaseConfig, mongoConfig],
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
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
