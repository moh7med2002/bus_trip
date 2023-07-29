import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Bus } from '../bus/bus.entity';
import { Booking } from '../booking/booking.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
}))
export class Trip extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.DOUBLE,
  })
  cost: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  day: Date;

  @ForeignKey(() => Bus)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  busId: number;

  @BelongsTo(() => Bus)
  bus: Bus;

  @HasMany(() => Booking)
  bookings: Booking[];
}
