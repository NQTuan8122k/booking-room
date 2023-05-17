import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity, AdminSchema } from './schema/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminEntity.name, schema: AdminSchema },
    ]),
  ],
  providers: [AdminService, JwtTokenService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
