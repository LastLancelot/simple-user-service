import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from './administrator.entity';
import { Repository } from 'typeorm';
import { AdministratorCreateDto } from './administrator.dto';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>,
  ) {}
  async createAdmin(administratorCreateDto: AdministratorCreateDto) {
    return await this.administratorRepository.save(administratorCreateDto);
  }
}
