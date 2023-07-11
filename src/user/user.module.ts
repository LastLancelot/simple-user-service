import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegularModule } from 'src/regular/regular.module';
import { BossModule } from 'src/boss/boss.module';
import { AdministratorModule } from 'src/admin/administrator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RegularModule,
    BossModule,
    AdministratorModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
