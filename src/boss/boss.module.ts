import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boss } from './boss.entity';
import { BossService } from './boss.service';
import { RegularModule } from 'src/regular/regular.module';

@Module({
  imports: [TypeOrmModule.forFeature([Boss]), RegularModule],
  providers: [BossService],
  exports: [BossService],
})
export class BossModule {}
