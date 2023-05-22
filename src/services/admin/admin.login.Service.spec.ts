import { Test, TestingModule } from '@nestjs/testing';
import { AdminLoginService } from './admin.login.Service';

describe('AdminLoginService', () => {
  let service: AdminLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminLoginService]
    }).compile();

    service = module.get<AdminLoginService>(AdminLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
