import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regular } from './regular-user.entity';
import { RegularService } from './regular.service';

@Module({
  imports: [TypeOrmModule.forFeature([Regular])],
  providers: [RegularService],
  exports: [RegularService],
})
export class RegularModule {}
