import {
  Table,
  Column,
  Model,
  DataType,
  Scopes,
  HasMany,
} from 'sequelize-typescript';
import { Trip } from '../trip/trip.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
}))
export class Bus extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  seats: number;

  @HasMany(() => Trip)
  trips: Trip[];
}
