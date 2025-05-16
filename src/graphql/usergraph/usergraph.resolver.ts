/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql'
import { UsergraphService } from './usergraph.service'
import { Usergraph } from './entities/usergraph.entity'
import { UpdateUsergraphInput } from './dto/update-usergraph.input'
import { PubSub } from 'graphql-subscriptions'
import { UseGuards, UsePipes } from '@nestjs/common'
import { GraphQLJwtAuthGuard } from 'src/jwt/guards/graphql.guard'
import { CreateUsergraphDto } from 'src/graphql/usergraph/dto/create-usergraph.input'
import { ZodValidationPipe } from 'nestjs-zod'

@Resolver(() => Usergraph)
@UsePipes(ZodValidationPipe)
export class UsergraphResolver {
  private pubSub: PubSub
  constructor(private readonly usergraphService: UsergraphService) {
    this.pubSub = new PubSub()
  }

  // listen to userAdded event
  @UseGuards(GraphQLJwtAuthGuard)
  @Subscription(() => Usergraph, {
    filter: (payload, variables) => {
      return payload.userAdded.email === variables.email
    }
  })
  userAdded(@Args('email') email: string) {
    return this.pubSub.asyncIterableIterator('userAdded')
  }

  @Mutation(() => Usergraph)
  async createUsergraph(@Args('createUsergraphInput') createUsergraphInput: CreateUsergraphDto) {
    const newUser = await this.usergraphService.create(createUsergraphInput)
    await this.pubSub.publish('userAdded', {
      userAdded: newUser
    })
    return newUser
  }

  @Query(() => [Usergraph], { name: 'usergraph' })
  findAll() {
    return this.usergraphService.findAll()
  }

  @Query(() => Usergraph, { name: 'usergraph' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usergraphService.findOne(id)
  }

  @Mutation(() => Usergraph)
  updateUsergraph(@Args('updateUsergraphInput') updateUsergraphInput: UpdateUsergraphInput) {
    return this.usergraphService.update(updateUsergraphInput.id, updateUsergraphInput)
  }
  // this is a mutation to remove a usergraph
  @Mutation(() => Usergraph)
  removeUsergraph(@Args('id', { type: () => Int }) id: number) {
    return this.usergraphService.remove(id)
  }
}
