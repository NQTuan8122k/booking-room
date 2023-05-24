import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { Module } from '@nestjs/common';

import { HotelController } from '@app/controller/hotel/hotel.controller';
import { HotelRepository } from '@app/repo/hotel.repository';
import { HotelEntity, HotelSchema } from '@app/schemas/hotel.schema';
import { HotelCreationService } from '@app/services/hotel/hotel.create.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: HotelEntity.name, schema: HotelSchema }])],
  providers: [HotelCreationService, JwtTokenService, HotelRepository],
  controllers: [HotelController],
  exports: [HotelRepository]
})
export class HotelModule {}
