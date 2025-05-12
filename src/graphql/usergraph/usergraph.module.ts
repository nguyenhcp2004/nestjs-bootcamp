import { Module } from '@nestjs/common'
import { UsergraphService } from './usergraph.service'
import { UsergraphResolver } from './usergraph.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Usergraph, UserSchema } from 'src/graphql/usergraph/entities/usergraph.entity'

@Module({
  imports: [MongooseModule.forFeature([{ name: Usergraph.name, schema: UserSchema }])],
  providers: [UsergraphResolver, UsergraphService]
})
export class UsergraphModule {}
