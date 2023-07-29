import { Module } from '@nestjs/common';
import { bookingRepositry } from 'src/constants/entityRepositry';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [
    {
      provide: bookingRepositry,
      useValue: Booking,
    },
    BookingService,
  ],
  exports: [bookingRepositry],
})
export class BookingModule {}
