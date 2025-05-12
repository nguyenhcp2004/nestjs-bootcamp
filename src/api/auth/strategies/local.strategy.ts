/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserResDto } from '../../user/dto/user.res.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // validate by email
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<UserResDto> {
    const user = await this.authService.validateAccount(email, password)
    if (!user) {
      throw new BadRequestException('Email or password is incorrect!!!')
    }

    return user
  }
}
