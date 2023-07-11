import { IsNotEmpty, IsNumber } from 'class-validator';
export class BossCreateDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
