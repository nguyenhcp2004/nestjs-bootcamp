import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'

@InputType()
export class CreateUsergraphDto {
  @IsNotEmpty()
  @Field(() => String)
  username: string

  @IsNotEmpty()
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @Field(() => String)
  password: string

  @IsOptional()
  @Field(() => String, { nullable: true })
  bio?: string

  @IsOptional()
  @Field(() => String, { nullable: true })
  image?: string

  @IsNotEmpty()
  @Field(() => String)
  role: string
}
