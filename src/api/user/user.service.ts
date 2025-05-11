import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserReqDto } from './dto/create-user.req.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '@/api/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResDto } from '@/api/user/dto/user.res.dto';
import { SYSTEM_USER_ID } from 'src/constants/app.constant';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserReqDto): Promise<UserResDto> {
    const { username, email, password, bio, image } = dto;

    // check uniqueness of username/email
    const user = await this.userRepository.findOne({
      where: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new UserEntity({
      username,
      email,
      password,
      bio,
      image,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedUser = await this.userRepository.save(newUser);
    this.logger.debug(savedUser);

    return plainToInstance(UserResDto, savedUser);
  }

  async findOne(id: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneByOrFail({ id });

    return user.toDto(UserResDto);
  }
}
