import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { LocalGovernmentAreaService } from './local-government-area.service';
import { LocalGovernmentAreaController } from './local-government-area.controller';

describe('LocalGovernmentAreaService', () => {
  let controller: LocalGovernmentAreaController;

  let service: LocalGovernmentAreaService;
  let databaseServiceMock: jest.Mocked<DatabaseService>;

  const testing = {
    status: true,
    message: 'Local Government Area retrieved successfully',
    data: {
      id: 1,
      name: 'Auyo',
      stateId: 1,
      stateName: 'Jigawa State',
      regionName: 'North-West',
      regionId: 1,
      description:
        'Auyo is a Local Government Area of Jigawa State, Nigeria. Its headquarters are in the town of Auyo, The Auyokawa language, now extinct, was formerly spoken in Auyo. The postal code of the area is 731.',
      population: 132001,
      established: '1400 AD',
      state: {
        id: 1,
        name: 'Jigawa',
        regionId: 1,
        population: 7000000,
        description:
          "Jigawa is the 8th most populated state in Nigeria, with an area of 23,442 square kilometers and a population density of 319.9 people per square kilometer. The state's population has been growing at an annual rate of 3.5% since 2006.",
        gdp: 2.6,
        regionName: 'North-West',
        governor: 'Umar Namadi',
        rulingParty: 'APC',
        capitalCity: 'Dutse',
        areaSize: '22,410 sq km',
        senatorialDistrict: [
          'Jigawa North-West',
          'Jigawa South-West',
          'Jigawa North-East',
        ],
      },
    },
  };

  beforeEach(async () => {
    databaseServiceMock = {
      localGovernmentArea: {
        findUnique: jest.fn(),
      },
    } as unknown as jest.Mocked<DatabaseService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalGovernmentAreaService,
        { provide: DatabaseService, useValue: databaseServiceMock },
      ],
    }).compile();

    service = module.get<LocalGovernmentAreaService>(
      LocalGovernmentAreaService,
    );
  });

  describe('getLgaById', () => {
    it('should find and return lga by Id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(testing);

      const result = await service.findOne(testing.data.id);
      expect(service.findOne).toHaveBeenCalledWith(testing.data.id);
      expect(result).toEqual(testing);
    });
  });
});
