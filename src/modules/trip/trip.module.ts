import { Module } from '@nestjs/common';
import { tripRepositry } from 'src/constants/entityRepositry';
import { Trip } from './trip.entity';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [],
  controllers: [TripController],
  providers: [
    {
      provide: tripRepositry,
      useValue: Trip,
    },
    TripService,
  ],
  exports: [tripRepositry],
})
export class TripModule {}
