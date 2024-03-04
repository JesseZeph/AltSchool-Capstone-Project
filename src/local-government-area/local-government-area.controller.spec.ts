import { Test, TestingModule } from '@nestjs/testing';
import { LocalGovernmentAreaController } from './local-government-area.controller';
import { LocalGovernmentAreaService } from './local-government-area.service';

describe('LocalGovernmentAreaController', () => {
  let controller: LocalGovernmentAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalGovernmentAreaController],
      providers: [LocalGovernmentAreaService],
    }).compile();

    controller = module.get<LocalGovernmentAreaController>(LocalGovernmentAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
