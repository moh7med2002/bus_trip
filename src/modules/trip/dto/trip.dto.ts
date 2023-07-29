import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TripCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  busId: number | string;
}
