import { Test, TestingModule } from '@nestjs/testing';
import { LocalGovernmentAreaService } from './local-government-area.service';

describe('LocalGovernmentAreaService', () => {
  let service: LocalGovernmentAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalGovernmentAreaService],
    }).compile();

    service = module.get<LocalGovernmentAreaService>(LocalGovernmentAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
