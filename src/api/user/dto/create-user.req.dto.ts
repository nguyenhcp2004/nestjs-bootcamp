import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserReqDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  bio?: string

  @IsString()
  @IsNotEmpty()
  image?: string
}
