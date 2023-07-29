import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class BusCreateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  seats: number;
}
