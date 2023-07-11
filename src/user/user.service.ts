import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string) {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: userCreateDto.username,
      },
    });
    if (user) {
      throw new HttpException(
        'User with this username already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userRepository.save(userCreateDto);
  }

  async findAllForAdministrator(): Promise<User[]> {
    return this.userRepository.find({});
  }
  async findAllForBoss(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('users')
      .select('*')
      .getMany();
  }
}
