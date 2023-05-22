import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '@app/constants/constant';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { AuthSignupService } from '@app/services/auth/auth.signup.Service';
import { AuthLoginService } from '@app/services/auth/auth.login.Service';
import { AuthController } from '@app/controller/auth/auth.controller';

import { AdminModule } from './admin.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    forwardRef(() => AdminModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' }
    })
  ],
  providers: [JwtTokenService, AuthSignupService, AuthLoginService],
  controllers: [AuthController]
})
export class AuthModule {}
