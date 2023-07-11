import {
  Request,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Body,
  Param,
  Patch,
  HttpException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { Role } from './enums/role.enum';
import { RegularService } from 'src/regular/regular.service';
import { BossService } from 'src/boss/boss.service';
import { Regular } from 'src/regular/regular-user.entity';
import { RegularUpdateDto } from 'src/regular/regular.dto';
import { validate } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private regularService: RegularService,
    private bossService: BossService,
  ) {}
  @ApiOperation({ summary: 'Get all users' })
  @ApiCreatedResponse({ description: 'User getted' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('users')
  async getAllUsers(@Request() req) {
    const role = (await this.userService.findOne(req.user.username)).role;
    if (role === Role.Administrator) {
      return await this.userService.findAllForAdministrator();
    }
    if (role === Role.Regular) {
      return await this.regularService.findAllForRegular(req.user.sub);
    }
    if (role === Role.Boss) {
      return await this.bossService.findAllForBoss(req.user.sub);
    }
  }

  @ApiOperation({ summary: 'Change regular boss`s id' })
  @ApiCreatedResponse({ description: 'Boss changed' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiBody({ type: Regular })
  @HttpCode(HttpStatus.OK)
  @Patch('change/bossId/:id')
  async changeBossIdToSubortinate(
    @Request() req,
    @Param('id') id: number,
    @Body() newBossId: RegularUpdateDto,
  ) {
    const user = await this.bossService.changeSubordinateBossId(
      id,
      req.user.sub,
    );
    if (!user) {
      throw new HttpException(
        'User not exist or this boss haven`t this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const errors = await validate(newBossId);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return await this.regularService.changeBossId(newBossId, id);
  }
}
