import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

@Exclude()
export class UserResDto {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  username: string;

  @IsString()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  bio?: string;

  @IsString()
  @Expose()
  image: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
