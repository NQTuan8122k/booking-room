import { Test, TestingModule } from '@nestjs/testing';

import { AdminSignupService } from './admin.signup.Service';

describe('AdminSignupService', () => {
  let service: AdminSignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminSignupService]
    }).compile();

    service = module.get<AdminSignupService>(AdminSignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
