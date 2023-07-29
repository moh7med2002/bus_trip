import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { bookingRepositry } from 'src/constants/entityRepositry';
import { Booking } from './booking.entity';
import { BookingCreateDto } from './dto';
import { BusService } from '../bus/bus.service';
import { TripService } from '../trip/trip.service';

type UserId = string | number;

@Injectable()
export class BookingService {
  constructor(
    @Inject(bookingRepositry)
    private bookingRepositry: typeof Booking,
  ) {}

  async create(
    userId: UserId,
    dto: BookingCreateDto,
  ): Promise<{ msg: string }> {
    const trip = await TripService.tripById(dto.tripId);
    const currentDate = new Date();
    if (new Date(trip.day) < currentDate) {
      throw new BadRequestException('this trip has been closed');
    }
    const bus = await BusService.busById(trip.busId);
    if (dto.seat > bus.seats) {
      throw new BadRequestException('Invalid seat number');
    }
    //  want to check if this seat for this trips has been booking
    const isAllowSeat = await this.bookingRepositry.findOne({
      where: {
        tripId: dto.tripId,
        seat: dto.seat,
      },
    });
    if (isAllowSeat) {
      throw new BadRequestException('This seat has been booking');
    }
    // now can create booking
    await this.bookingRepositry.create({
      tripId: dto.tripId,
      seat: dto.seat,
      userId,
    });
    return { msg: 'booking has been created' };
  }
}
