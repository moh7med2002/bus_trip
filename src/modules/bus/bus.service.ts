import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { busRepositry } from 'src/constants/entityRepositry';
import { Bus } from './bus.entity';
import { BusCreateDto } from './dto';

@Injectable()
export class BusService {
  constructor(
    @Inject(busRepositry)
    private busRepositry: typeof Bus,
  ) {}

  async create(dto: BusCreateDto): Promise<{ msg: string }> {
    const { name, seats } = dto;
    const found_bus_name = await this.busRepositry.findOne({
      where: { name: name },
    });
    if (found_bus_name) {
      throw new ForbiddenException('Bus name already used');
    }
    await this.busRepositry.create({
      name,
      seats,
    });
    return { msg: 'bus has been created' };
  }

  async fetchAll(): Promise<{ buses: Bus[] }> {
    const buses = await this.busRepositry.scope('withoutTimeStamps').findAll();
    return { buses };
  }

  // static function
  static async busById(busId) {
    const bus = await Bus.findByPk(busId);
    if (!bus) {
      throw new NotFoundException('Invalid bus id');
    }
    return bus;
  }
}
