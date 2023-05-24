import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HotelDao } from '@app/dao/hotel/hotel.dao';
import { HotelEntity } from '@app/schemas/hotel.schema';
import { HotelCreationDto } from '@app/dto/hotel/create.hotel.dto';

export class HotelRepository {
  constructor(
    @InjectModel(HotelEntity.name)
    private repository: Model<HotelDao>
  ) {}

  async create(room: HotelCreationDto) {
    return await this.repository.create(room);
  }
}
