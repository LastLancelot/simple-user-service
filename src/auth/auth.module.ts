import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RegularModule } from 'src/regular/regular.module';
import { BossModule } from 'src/boss/boss.module';
import { AdministratorModule } from 'src/admin/administrator.module';

@Module({
  imports: [
    UserModule,
    RegularModule,
    BossModule,
    AdministratorModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
