import { RoomService } from '@app/services/room/room.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user/user.controller';
import { UserRepository } from 'src/repo/user.repository';
import { UserEntity, UserSchema } from 'src/schemas/user.schema';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  providers: [RoomService, JwtTokenService, UserRepository],
  controllers: [UserController],
  exports: [RoomService, UserRepository]
})
export class UserModule {}
