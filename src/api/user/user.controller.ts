import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserReqDto } from './dto/create-user.req.dto'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserReqDto) {
    return this.userService.create(createUserDto)
  }

  @Get(':id')
  @UseGuards(ThrottlerGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }
}
