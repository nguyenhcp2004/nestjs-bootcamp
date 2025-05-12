import { Test, TestingModule } from '@nestjs/testing';
import { UsergraphService } from './usergraph.service';

describe('UsergraphService', () => {
  let service: UsergraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsergraphService],
    }).compile();

    service = module.get<UsergraphService>(UsergraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
