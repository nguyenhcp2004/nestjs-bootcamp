import { Test, TestingModule } from '@nestjs/testing';
import { UsergraphResolver } from './usergraph.resolver';
import { UsergraphService } from './usergraph.service';

describe('UsergraphResolver', () => {
  let resolver: UsergraphResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsergraphResolver, UsergraphService],
    }).compile();

    resolver = module.get<UsergraphResolver>(UsergraphResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
