import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { roleAuthGuardFactory } from 'src/common/guards.stradegey';
import { BookingService } from './booking.service';
import { BookingCreateDto } from './dto';
import { SaveUser } from 'src/common/SaveUser';
import { User } from '../user/user.entity';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('user'))
  create(@SaveUser() user: User, @Body() dto: BookingCreateDto) {
    return this.bookingService.create(user.id, dto);
  }
}
