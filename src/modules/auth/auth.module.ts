import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    // JwtModule.registerAsync({
    //   useFactory: () => ({
    //     privateKey: 'JWT_PRIVATE_KEY',
    //     publicKey: 'JWT_PUBLIC_KEY',
    //     secret: jwtConstants.secret,
    //     signOptions: {
    //       algorithm: 'RS256',
    //     },
    //     verifyOptions: {
    //       algorithms: ['RS256'],
    //     },
    //   }),
    //   // inject: [ApiConfigService],
    // }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
