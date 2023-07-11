import { IsNotEmpty, IsNumber } from 'class-validator';
export class AdministratorCreateDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
