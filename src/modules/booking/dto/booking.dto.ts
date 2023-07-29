import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class BookingCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Seat must be greater than zero' })
  seat: number;

  @IsNotEmpty()
  tripId: number | string;
}
