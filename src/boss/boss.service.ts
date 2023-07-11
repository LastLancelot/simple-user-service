import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boss } from './boss.entity';
import { Repository } from 'typeorm';
import { BossCreateDto } from './boss.dto';

@Injectable()
export class BossService {
  constructor(
    @InjectRepository(Boss)
    private bossRepository: Repository<Boss>,
  ) {}

  async findAllForBoss(id: number): Promise<any> {
    return this.bossRepository
      .createQueryBuilder('boss')
      .leftJoinAndSelect('boss.user', 'user')
      .leftJoinAndSelect('boss.subordinates', 'regulars')
      .leftJoinAndSelect('regulars.user', 'reg_user')
      .where('regulars.boss_id = boss.id and boss.user_id = :id', { id })
      .getOne();
  }

  async createBoss(bossCreateDto: BossCreateDto) {
    return await this.bossRepository.save(bossCreateDto);
  }

  async changeSubordinateBossId(id: number, old_boss_id: number) {
    const user = this.bossRepository
      .createQueryBuilder('boss')
      .leftJoin('boss.user', 'user')
      .leftJoinAndSelect('boss.subordinates', 'regular')
      .leftJoin('regular.boss', 'old_boss')
      .where('regular.id = :id and old_boss.user_id = :old_boss_id', {
        id,
        old_boss_id,
      })
      .getOne();

    return await user;
  }
}
