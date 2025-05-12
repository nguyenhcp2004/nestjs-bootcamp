/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserEntity } from '@/api/user/entities/user.entity'
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from 'src/decorators/role.decorator'
import { DataSource } from 'typeorm'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get(Roles, context.getHandler())

    if (!requiredRoles) return true
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) throw new ForbiddenException('You have not logged into this website!')

    const account = await this.dataSource.getRepository(UserEntity).findOne({
      where: { id: user.id }
    })

    if (!account || !account.role || !requiredRoles.includes(account.role)) {
      throw new ForbiddenException('You do not have permission to do this!')
    }

    return true
  }
}
