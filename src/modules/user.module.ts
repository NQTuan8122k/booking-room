import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user/user.controller';
import { UserRepository } from 'src/repo/user.repository';
import { UserEntity, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user/user.service';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [UserService, JwtTokenService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
