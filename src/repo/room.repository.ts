import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDao } from '@app/dao/room/room.dao';
import { CreateRoomDto } from '@app/dto/room/create.room.dto';
import { UpdateRoomDto } from '@app/dto/room/update.room.dto';
import { RoomEntity } from '@app/schemas/rooms.schema';

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

  async create(room: CreateRoomDto): Promise<RoomDao> {
    return await this.repository.create(room);
  }

  async updateOne(id, dataUpdate: UpdateRoomDto): Promise<any> {
    try {
      return await this.repository.findByIdAndUpdate(
        { id: id },
        {
          $set: {
            ...dataUpdate
          }
        },
        {
          new: true
        }
      );
    } catch (error) {
      console.log('=** error', error);
    }
  }
}
