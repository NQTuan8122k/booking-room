import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigService } from '@nestjs/config';
import { ApiConfigService } from './services/api-config.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/modules/auth/constant';
import { JwtTokenService } from './services/JwtTokenService.service';

const providers: Provider[] = [ApiConfigService, ConfigService];

@Module({
  imports: [
    // CqrsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtTokenService],
})
export class SharedModule {}
