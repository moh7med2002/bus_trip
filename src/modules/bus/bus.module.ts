import { Module } from '@nestjs/common';
import { busRepositry } from 'src/constants/entityRepositry';
import { Bus } from './bus.entity';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

@Module({
  imports: [],
  controllers: [BusController],
  providers: [
    {
      provide: busRepositry,
      useValue: Bus,
    },
    BusService,
  ],
  exports: [busRepositry],
})
export class BusModule {}
