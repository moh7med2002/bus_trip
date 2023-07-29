import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { tripRepositry } from 'src/constants/entityRepositry';
import { Trip } from './trip.entity';
import { TripCreateDto } from './dto/trip.dto';
import { BusService } from '../bus/bus.service';
import { Bus } from '../bus/bus.entity';
import { Op } from 'sequelize';
import { Booking } from '../booking/booking.entity';

@Injectable()
export class TripService {
  constructor(
    @Inject(tripRepositry)
    private tripRepositry: typeof Trip,
  ) {}

  async create(dto: TripCreateDto): Promise<{ msg: string }> {
    if (new Date(dto.day) < new Date()) {
      throw new BadRequestException('Inavlid date');
    }
    await BusService.busById(dto.busId);
    await this.tripRepositry.create({
      day: dto.day,
      description: dto.description,
      cost: dto.cost,
      busId: dto.busId,
    });
    return { msg: 'trip has been created' };
  }

  async fetchAll(): Promise<{ tripes: Trip[] }> {
    const currentDate = new Date();
    const tripes = await this.tripRepositry.findAll({
      where: {
        day: {
          [Op.gte]: currentDate,
        },
      },
      include: [
        {
          model: Bus,
          attributes: ['id', 'name', 'seats'],
        },
        {
          model: Booking,
          attributes: ['seat'],
        },
      ],
    });
    return { tripes };
  }

  async fetchAllFinished(): Promise<{ tripes: Trip[] }> {
    const currentDate = new Date();
    const tripes = await this.tripRepositry.findAll({
      where: {
        day: {
          [Op.lt]: currentDate,
        },
      },
      include: [
        {
          model: Bus,
          attributes: ['id', 'name', 'seats'],
        },
        {
          model: Booking,
          attributes: ['seat'],
        },
      ],
    });
    return { tripes };
  }

  // static function
  static async tripById(tripId) {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      throw new NotFoundException('Invalid trip id');
    }
    return trip;
  }
}
