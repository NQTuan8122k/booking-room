import type { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigService } from '@nestjs/config';
import { ApiConfigService } from './services/api-config.service';

const providers: Provider[] = [ApiConfigService, ConfigService];

@Module({
  imports: [CqrsModule],
  providers,
  exports: [ApiConfigService],
})
export class SharedModule {}
