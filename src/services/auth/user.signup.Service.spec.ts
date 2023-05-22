import { Test, TestingModule } from '@nestjs/testing';

import { UserSignupService } from './user.signup.Service';

describe('AuthSignupService', () => {
  let service: UserSignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSignupService]
    }).compile();

    service = module.get<UserSignupService>(UserSignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
