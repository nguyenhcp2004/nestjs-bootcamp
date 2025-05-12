import { AuthConfig } from '@/api/auth/config/auth-config.type'
import { DatabaseConfig } from 'src/database/config/database-config.type'
import { DatabaseMongoConfig } from 'src/database/config/mongoose-config.type'

export type AllConfigType = {
  database: DatabaseConfig
  mongo: DatabaseMongoConfig
  auth: AuthConfig
}
