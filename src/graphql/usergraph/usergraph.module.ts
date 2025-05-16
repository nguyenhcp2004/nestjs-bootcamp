import { Module } from '@nestjs/common'
import { UsergraphService } from './usergraph.service'
import { UsergraphResolver } from './usergraph.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Usergraph, UserSchema } from 'src/graphql/usergraph/entities/usergraph.entity'
import { JwtModule } from 'src/jwt/jwt.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usergraph.name, schema: UserSchema }]),
    JwtModule.register({
      isGlobal: true,
      accessSecret: 'secret',
      accessExpiresIn: '1h',
      refreshExpiresIn: '1d',
      refreshSecret: 'secret'
    })
  ],
  providers: [UsergraphResolver, UsergraphService]
})
export class UsergraphModule {}
