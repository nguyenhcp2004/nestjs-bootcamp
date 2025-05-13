import { InputType, Int, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'
import { createZodDto } from 'nestjs-zod'
import { UserRole } from 'src/graphql/usergraph/enum/user-role.enum'
import { z } from 'zod'

// @InputType()
// export class CreateUsergraphDto {
//   @IsNotEmpty()
//   @Field(() => String)
//   username: string

//   @IsNotEmpty()
//   @IsEmail()
//   @Field(() => String)
//   email: string

//   @IsNotEmpty()
//   @Field(() => String)
//   password: string

//   @IsOptional()
//   @Field(() => String, { nullable: true })
//   bio?: string

//   @IsOptional()
//   @Field(() => String, { nullable: true })
//   image?: string

//   @IsNotEmpty()
//   @Field(() => UserRole)
//   role: UserRole
// }

const CreateUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  bio: z.string().optional(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole)
})

@InputType()
export class CreateUsergraphDto extends createZodDto(CreateUserSchema) {
  @Field(() => String)
  username: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String, { nullable: true })
  bio?: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => UserRole)
  role: UserRole
}
