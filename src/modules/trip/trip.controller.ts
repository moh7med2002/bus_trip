import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { roleAuthGuardFactory } from 'src/common/guards.stradegey';
import { TripService } from './trip.service';
import { TripCreateDto } from './dto/trip.dto';

@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  create(@Body() dto: TripCreateDto) {
    return this.tripService.create(dto);
  }

  @Get('all')
  fetchAll() {
    return this.tripService.fetchAll();
  }

  @Get('all/finished')
  fetchAllFinished() {
    return this.tripService.fetchAllFinished();
  }
}
