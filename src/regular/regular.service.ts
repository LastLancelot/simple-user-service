import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Regular } from './regular-user.entity';
import { Repository } from 'typeorm';
import { RegularCreateDto, RegularUpdateDto } from './regular.dto';

@Injectable()
export class RegularService {
  constructor(
    @InjectRepository(Regular)
    private regularRepository: Repository<Regular>,
  ) {}

  async findAllForRegular(id: number): Promise<Regular> {
    return await this.regularRepository
      .createQueryBuilder('regular')
      .leftJoinAndSelect('regular.user', 'user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async createRegular(regularCreateDto: RegularCreateDto) {
    return this.regularRepository.save(regularCreateDto);
  }

  async changeBossId(newBossId: RegularUpdateDto, regularId: number) {
    return await this.regularRepository.update(regularId, newBossId);
  }
}
