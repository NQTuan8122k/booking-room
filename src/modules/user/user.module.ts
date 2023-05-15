import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { AdminUserService } from './admin.service';
import { AdminEntity } from './schema/admin.schema';
import { UserEntity, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: AdminEntity.name, schema: UserSchema }]),
  ],
  providers: [UserService, JwtTokenService, AdminUserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
