import { ObjectType, Field } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { UserRole } from 'src/graphql/usergraph/enum/user-role.enum'

@ObjectType()
@Schema()
export class Usergraph {
  @Prop({ type: String, default: () => crypto.randomUUID() })
  @Field()
  id: string

  @Prop()
  @Field()
  username: string

  @Prop()
  @Field()
  email: string

  @Prop()
  @Field()
  password: string

  @Prop()
  @Field({ nullable: true })
  bio?: string

  @Prop()
  @Field({ nullable: true })
  image?: string

  @Prop()
  @Field(() => UserRole)
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(Usergraph)
