import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { UserService } from '../user/user.service'
import { verifyPassword } from '@/utils/password.util'
import { UserResDto } from '../user/dto/user.res.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { LoginRequestDto } from '@/api/auth/dto/login.req.dto'
type PayLoadAuth = {
  id: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private async generateTokens(accountId: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: accountId, role },
        {
          secret: this.configService.get<string>('ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_EXPIRES_IN')
        }
      ),
      this.jwtService.signAsync(
        { id: accountId },
        {
          secret: this.configService.get<string>('REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_EXPIRES_IN')
        }
      )
    ])

    return { accessToken, refreshToken }
  }

  async login(user: PayLoadAuth) {
    const tokens = await this.generateTokens(user.id, user.role)
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new Error('Login failed')
    }
    return tokens
  }

  async validateAccount(email: string, password: string) {
    const user = await this.userService.findOne(email)
    if (!user) {
      return null
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return user
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth'
  }

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
