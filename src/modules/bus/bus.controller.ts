import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { BusService } from './bus.service';
import { roleAuthGuardFactory } from 'src/common/guards.stradegey';
import { BusCreateDto } from './dto';

@Controller('bus')
export class BusController {
  constructor(private busService: BusService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  create(@Body() dto: BusCreateDto) {
    return this.busService.create(dto);
  }

  @Get('all')
  getAllBus() {
    return this.busService.fetchAll();
  }
}
