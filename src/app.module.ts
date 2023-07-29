import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { BusModule } from './modules/bus/bus.module';
import { TripModule } from './modules/trip/trip.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    AdminModule,
    UserModule,
    BusModule,
    TripModule,
    BookingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
