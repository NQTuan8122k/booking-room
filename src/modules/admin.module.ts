import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { AdminController } from 'src/controller/admin/admin.controller';
import { AdminService } from 'src/services/admin/admin.service';

import { AdminEntity, AdminSchema } from '../schemas/admin.schema';
import { AdminRepository } from '@app/repo/admin.repository';
import { AdminSignupService } from '@app/services/admin/admin.signup.Service';
import { AdminLoginService } from '@app/services/admin/admin.login.Service';

@Module({
  imports: [MongooseModule.forFeature([{ name: AdminEntity.name, schema: AdminSchema }])],
  providers: [AdminService, JwtTokenService, AdminSignupService, AdminLoginService, AdminRepository],
  controllers: [AdminController],
  exports: [AdminService, AdminRepository]
})
export class AdminModule {}
