import { RoomRepository } from '@app/repo/room.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { Module } from '@nestjs/common';

import { RoomController } from '@app/controller/room/room.controller';
import { RoomEntity, RoomSchema } from '@app/schemas/rooms.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomCreationService } from '@app/services/room/room.create.service';
import { RoomUpdateService } from '@app/services/room/room.update.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoomEntity.name, schema: RoomSchema }])],
  providers: [RoomCreationService, JwtTokenService, RoomRepository, RoomUpdateService],
  controllers: [RoomController],
  exports: [RoomRepository]
})
export class RoomModule {}
