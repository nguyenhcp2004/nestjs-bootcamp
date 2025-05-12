import { registerEnumType } from '@nestjs/graphql'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

registerEnumType(UserRole, {
  name: 'UserRole'
})
