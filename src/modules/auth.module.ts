import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtTokenService } from 'src/shared/services/JwtTokenService.service';
import { UserModule } from './user.module';
import { AdminModule } from './admin.module';
import { jwtConstants } from 'src/constants/constant';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthSignupService } from 'src/services/auth/auth.signup.Service';
import { AuthLoginService } from 'src/services/auth/auth.login.Service';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    forwardRef(() => AdminModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
  ],
  providers: [JwtTokenService, AuthSignupService, AuthLoginService],
  controllers: [AuthController],
})
export class AuthModule {}
