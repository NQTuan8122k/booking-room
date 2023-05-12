import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
