import { Test, TestingModule } from '@nestjs/testing';

import { AuthSignupService } from './auth.signup.Service';

describe('AuthSignupService', () => {
  let service: AuthSignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSignupService]
    }).compile();

    service = module.get<AuthSignupService>(AuthSignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
