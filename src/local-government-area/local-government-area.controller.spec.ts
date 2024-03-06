import { Test, TestingModule } from '@nestjs/testing';
import { LocalGovernmentAreaController } from './local-government-area.controller';
import { LocalGovernmentAreaService } from './local-government-area.service';
import { Prisma } from '@prisma/client';

describe('LocalGovernmentAreaController', () => {
  let controller: LocalGovernmentAreaController;
  let service: LocalGovernmentAreaService;

  const mockLga = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Bla',
    description: 'Description',
    population: 100,
    governor: 'Administ',
    stateId: 1,
  };

  const mockLgaService = {
    findAll: jest.fn().mockReturnValue([mockLga]),
    create: jest.fn(),
    updateById: jest.fn(),
    remove: jest.fn().mockResolvedValueOnce({ remove: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalGovernmentAreaController],
      providers: [
        { provide: LocalGovernmentAreaService, useValue: mockLgaService },
      ],
    }).compile();

    controller = module.get<LocalGovernmentAreaController>(
      LocalGovernmentAreaController,
    );

    service = module.get<LocalGovernmentAreaService>(
      LocalGovernmentAreaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all lga', () => {
    it('should get all lga', async () => {
      const result = await service.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockLga]);
    });
  });

  describe('create', () => {
    it('should create a new lga', async () => {
      const newLga = {
        name: 'Bla',
        description: 'Description',
        population: 100,
      };

      service.create = jest.fn().mockResolvedValueOnce(newLga);

      const result = await controller.create(
        newLga as Prisma.LocalGovernmentAreaCreateInput,
      );

      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(newLga);
    });
  });

  describe('update', () => {
    it('should update LGA by its ID', async () => {
      const updatedLga = { ...mockLga, name: 'Updated name' };
      const lga = { name: 'Updated name' };

      service.update = jest.fn().mockResolvedValueOnce(updatedLga);

      const result = await controller.update(
        mockLga._id,
        lga as Prisma.LocalGovernmentAreaUpdateInput,
      );

      expect(service.update).toHaveBeenCalled();
      expect(result).toEqual(updatedLga);
    });
  });

  describe('delete', () => {
    it('should delete a LGA by ID', async () => {
      const result = await controller.remove(mockLga._id);

      expect(service.remove).toHaveBeenCalled();
      expect(result).toEqual({ remove: true });
    });
  });
});
