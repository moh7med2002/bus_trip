import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  HasMany,
} from 'sequelize-typescript';
import { Booking } from '../booking/booking.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
  withoutPassword: {
    attributes: { exclude: ['password', 'updatedAt'] },
  },
}))
export class User extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  phone: string;

  @HasMany(() => Booking)
  bookings: Booking[];
}
