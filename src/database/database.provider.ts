import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/admin.entity';
import { Booking } from 'src/modules/booking/booking.entity';
import { Bus } from 'src/modules/bus/bus.entity';
import { Trip } from 'src/modules/trip/trip.entity';
import { User } from 'src/modules/user/user.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '059283805928388',
        database: 'travell',
      });
      sequelize.addModels([Admin, User, Bus, Trip, Booking]);
      await sequelize.sync({ alter: !true });
      return sequelize;
    },
  },
];
