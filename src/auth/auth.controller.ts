import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { Public } from './public.declaration';
import { UserCreateDto } from 'src/user/user.dto';
import { validate } from 'class-validator';
import { Role } from 'src/user/enums/role.enum';
import { RegularService } from 'src/regular/regular.service';
import { AdministratorService } from 'src/admin/administrator.service';
import { BossService } from 'src/boss/boss.service';
import { RegularCreateDto } from 'src/regular/regular.dto';
import { BossCreateDto } from 'src/boss/boss.dto';
import { AdministratorCreateDto } from 'src/admin/administrator.dto';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private regularService: RegularService,
    private bossService: BossService,
    private administratorService: AdministratorService,
  ) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'User created successfuly' })
  @ApiBody({ type: User })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('SingUp')
  async singUp(@Body() userCreateDto: UserCreateDto) {
    const errors = await validate(userCreateDto);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const roleUser = await this.authService.singUp(userCreateDto);
    if (roleUser.role === Role.Administrator) {
      const administratorCreateDto: AdministratorCreateDto = {
        user_id: roleUser.id,
      };
      this.administratorService.createAdmin(administratorCreateDto);
    }
    if (roleUser.role === Role.Regular) {
      const regularCreateDto: RegularCreateDto = {
        user_id: roleUser.id,
        boss_id: userCreateDto.boss_id,
      };

      if (regularCreateDto.boss_id) {
        this.regularService.createRegular(regularCreateDto);
      } else {
        throw new HttpException(
          'Id for boss id not provided',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (roleUser.role === Role.Boss) {
      const bossCreateDto: BossCreateDto = {
        user_id: roleUser.id,
      };
      this.bossService.createBoss(bossCreateDto);
    }
    return roleUser;
  }

  @ApiOperation({ summary: 'Login as a user' })
  @ApiCreatedResponse({ description: 'logging is successfuly passed' })
  @ApiBody({ type: User })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('SingIn')
  async singIn(@Body() singInDto: Record<string, any>) {
    return await this.authService.singIn(
      singInDto.username,
      singInDto.password,
    );
  }
}
