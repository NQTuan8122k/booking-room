import { Test, TestingModule } from '@nestjs/testing';

import { RoomCreationService } from './room.create.service';

describe('UserService', () => {
  let service: RoomCreationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomCreationService]
    }).compile();

    service = module.get<RoomCreationService>(RoomCreationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
