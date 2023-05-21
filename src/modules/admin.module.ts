import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { AdminEntity, AdminSchema } from '../schemas/admin.schema';
import { AdminController } from 'src/controller/admin/admin.controller';
import { AdminService } from 'src/services/admin/admin.service';

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
