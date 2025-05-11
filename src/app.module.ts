import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/database/config/database-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('database.host', {
            infer: true,
          }),
          port: configService.getOrThrow('database.port', {
            infer: true,
          }),
          username: configService.getOrThrow('database.username', {
            infer: true,
          }),
          password: configService.getOrThrow('database.password', {
            infer: true,
          }),
          database: configService.getOrThrow('database.name', {
            infer: true,
          }),
          entities: [],
          synchronize: true,
        };
      },
    }),
    MongooseModule.forRoot(
      'mongodb://mongo:mongo@localhost:27017/nest_api?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
