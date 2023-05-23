import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDao } from '@app/dao/room/room.dao';
import { RoomInterface } from '@app/dto/room/create.room.dto';
import { RoomEntity } from '@app/schemas/rooms.schema';
import { UpdateRoomInterface } from '@app/dto/room/update.room.dto';

export class RoomRepository {
  constructor(
    @InjectModel(RoomEntity.name)
    private repository: Model<RoomDao>
  ) {}

  async findAll(data): Promise<RoomDao[]> {
    return await this.repository.find({
      ...data
    });
  }

  async create(room: RoomInterface): Promise<RoomDao> {
    return await this.repository.create(room);
  }

  async updateOne(room: UpdateRoomInterface): Promise<any> {
    const {
      bathroomCount,
      bed,
      bedType,
      category,
      description,
      guestCount,
      hotelId,
      imageSrc,
      locationValue,
      price,
      roomCount,
      roomNo
    } = room;
    const data = {
      ...(bathroomCount ? { bathroomCount } : {}),
      ...(bed ? { bed } : {}),
      ...(bedType ? { bedType } : {}),
      ...(category ? { category } : {}),
      ...(description ? { description } : {}),
      ...(guestCount ? { guestCount } : {}),
      ...(hotelId ? { hotelId } : {}),
      ...(imageSrc ? { imageSrc } : {}),
      ...(locationValue ? { locationValue } : {}),
      ...(price ? { price } : {}),
      ...(roomCount ? { roomCount } : {}),
      ...(roomNo ? { roomNo } : {})
    };
    const result = await this.repository.updateOne({ _id: room.id }, data);

    return result;
  }
}
