/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import validateConfig from '@/utils/validate-config';
import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { DatabaseConfig } from './database-config.type';
import { DatabaseMongoConfig } from 'src/database/config/mongoose-config.type';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;
}

export default registerAs<DatabaseMongoConfig>('mongo', () => {
  console.info(`Register DatabaseConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: process.env.MONGO_HOST!,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : 27017,
    password: process.env.MONGO_PASSWORD!,
    database: process.env.MONGO_NAME!,
    username: process.env.MONGO_USERNAME!,
  };
});
