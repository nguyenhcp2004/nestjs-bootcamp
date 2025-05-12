import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { UserRole } from 'src/graphql/usergraph/enum/user-role.enum'

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
  @Field(() => UserRole)
  role: UserRole
}
