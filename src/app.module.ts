import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { DataSource } from 'typeorm';
import { Administrator } from './admin/administrator.entity';
import { Boss } from './boss/boss.entity';
import { Regular } from './regular/regular-user.entity';
import { BossModule } from './boss/boss.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest_user',
      password: '12v12s12',
      database: 'simple_user_service',
      entities: [User, Administrator, Boss, Regular],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    BossModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
