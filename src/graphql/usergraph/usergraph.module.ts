import { Module } from '@nestjs/common'
import { UsergraphService } from './usergraph.service'
import { UsergraphResolver } from './usergraph.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Usergraph, UserSchema } from 'src/graphql/usergraph/entities/usergraph.entity'
import { JwtModule } from 'src/jwt/jwt.module'
import { EmailQueueModule } from 'src/cron-worker/email/email.module'
import { BullModule } from 'src/background/bull.module'
import { BullQueueName } from 'src/background/bull.types'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usergraph.name, schema: UserSchema }]),
    JwtModule.register({
      isGlobal: true,
      accessSecret: 'secret',
      accessExpiresIn: '1h',
      refreshExpiresIn: '1d',
      refreshSecret: 'secret'
    }),
    BullModule.registerQueue({
      queueName: BullQueueName.Email
    }),
    EmailQueueModule,
    CacheModule.register()
  ],
  providers: [UsergraphResolver, UsergraphService]
})
export class UsergraphModule {}
