import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { Module } from '@nestjs/common';

import { RoomController } from '@app/controller/room/room.controller';
import { RoomRepository } from '@app/repo/room.repository';
import { RoomEntity, RoomSchema } from '@app/schemas/rooms.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from '@app/services/room/room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoomEntity.name, schema: RoomSchema }])],
  providers: [RoomService, JwtTokenService, RoomRepository],
  controllers: [RoomController],
  exports: [RoomService, RoomRepository]
})
export class RoomModule {}
