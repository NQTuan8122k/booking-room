import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from './modules/auth.module';
import { RoomModule } from './modules/room.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://root:password@127.0.0.1:27017'),
    MongooseModule.forRoot('mongodb+srv://root:password1289@cluster0.e8zxjw8.mongodb.net/booking'),
    UserModule,
    AuthModule,
    RoomModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
