// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// import { RoomDao } from '@app/dao/room/room.dao';
// import { RoomInterface } from '@app/dto/room/create.room.dto';
// import { RoomEntity } from '@app/schemas/rooms.schema';

// export class RoomRepository {
//   constructor(
//     @InjectModel(RoomEntity.name)
//     private repository: Model<RoomDao>
//   ) {}

//   async findAll(data): Promise<RoomDao[]> {
//     return await this.repository.find({
//       ...data
//     });
//   }

//   async createNewRoom(user: RoomInterface) {
//     return await this.repository.create(user);
//   }
// }
