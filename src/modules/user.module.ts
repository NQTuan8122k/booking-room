import { MyInfoService } from '@app/services/user/myinfo.service';
import { UpdateMyInfoService } from '@app/services/user/update.myinfo.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user/user.controller';
import { UserRepository } from 'src/repo/user.repository';
import { UserEntity, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  providers: [UserService, JwtTokenService, UserRepository, MyInfoService, UpdateMyInfoService],
  controllers: [UserController],
  exports: [UserRepository]
})
export class UserModule {}
