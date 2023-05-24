import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HotelDao } from '@app/dao/hotel/hotel.dao';
import { HotelEntity } from '@app/schemas/hotel.schema';

export class HotelRepository {
  constructor(
    @InjectModel(HotelEntity.name)
    private repository: Model<HotelDao>
  ) {}

  async create(room) {
    return await this.repository.create(room);
  }
}
