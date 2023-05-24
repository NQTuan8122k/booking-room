import { Test, TestingModule } from '@nestjs/testing';

import { HotelCreationService } from './hotel.create.service';

describe('UserService', () => {
  let service: HotelCreationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelCreationService]
    }).compile();

    service = module.get<HotelCreationService>(HotelCreationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
