import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Bus } from '../bus/bus.entity';
import { User } from '../user/user.entity';
import { Trip } from '../trip/trip.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
}))
export class Booking extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  seat: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Trip)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  tripId: number;

  @BelongsTo(() => Trip)
  trip: Trip;
}
