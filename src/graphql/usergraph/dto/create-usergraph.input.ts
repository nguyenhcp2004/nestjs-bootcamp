import { InputType, Int, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'
import { UserRole } from 'src/graphql/usergraph/enum/user-role.enum'

@InputType()
export class CreateUsergraphDto {
  @IsNotEmpty()
  @Field(() => String)
  username: string

  @IsNotEmpty()
  @IsEmail()
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
