/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

async function bootstrapMainApp() {
  const app = await NestFactory.create(AppModule)

  // Enable validation pipe
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //     exceptionFactory: (validationErrors: ValidationError[] = []) => {
  //       return new UnprocessableEntityException(validationErrors)
  //     }
  //   })
  // )

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
}

async function bootstrapAdminUI() {
  const app = await NestFactory.create<NestExpressApplication>(
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'node_modules', '@socket.io', 'admin-ui', 'ui', 'dist')
    })
  )

  await app.listen(3003)
  console.log(`✅ Admin UI running on port 3003`)
}

async function bootstrapAll() {
  await Promise.all([bootstrapMainApp(), bootstrapAdminUI()])
}

bootstrapAll()
