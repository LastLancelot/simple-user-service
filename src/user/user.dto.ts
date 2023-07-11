import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from './enums/role.enum';
export class UserCreateDto {
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastname: string;

  @Matches(
    `^${Object.values(Role)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  role: Role;
  @IsOptional()
  boss_id: number;
}
