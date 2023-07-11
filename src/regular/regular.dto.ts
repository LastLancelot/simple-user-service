import { IsNotEmpty, IsNumber } from 'class-validator';
export class RegularCreateDto {
  @IsNumber()
  @IsNotEmpty()
  boss_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

export class RegularUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  boss_id: number;
}
