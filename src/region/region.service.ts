import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { DatabaseService } from 'src/database/database.service';
import { Prisma, Region } from '@prisma/client';
import { ValidationUtil } from 'utils/validation.util';
@Injectable()
export class RegionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async searchRegions(
    query: string,
  ): Promise<{ status: boolean; message: string; data: Region[] }> {
    try {
      const regions = await this.databaseService.region.findMany({
        where: {
          OR: [{ name: { contains: query, mode: 'insensitive' } }],
        },
        include: {
          states: true,
        },
      });

      return {
        status: true,
        message: 'Search Results Available',
        data: regions,
      };
    } catch (error) {
      throw new Error(`Error searching regions: ${error.message}`);
    }
  }

  async create(createRegionDto: Prisma.RegionCreateInput) {
    ValidationUtil.validateRequiredFields(
      createRegionDto,
      ['country', 'name', 'president'],
      'Region',
    );

    const region = await this.databaseService.region.findUnique({
      where: {
        name: createRegionDto.name,
      },
    });

    if (region) throw new ConflictException('Region Already Exists');

    const newRegion = await this.databaseService.region.create({
      data: createRegionDto,
    });

    return {
      status: true,
      message: 'Region Created Successfully',
      data: newRegion,
    };
  }

  async getRegions() {
    console.log('Inside Service');
    const regionData = await this.findAll();
    return regionData;
  }
  async findAll() {
    return this.databaseService.region.findMany();
  }

  async getRegionsById(id: number) {
    const regionDataId = await this.findOne(id);
    return regionDataId;
  }

  async findOne(id: number) {
    const region = await this.databaseService.region.findUnique({
      where: {
        id,
      },
      include: {
        states: true,
        localGovernmentAreas: true,
      },
    });

    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    return {
      status: true,
      message: 'Region retrieved successfully',
      data: region,
    };
  }

  async update(id: number, updateRegionDto: Prisma.RegionUpdateInput) {
    const region = await this.databaseService.region.findUnique({
      where: {
        id,
      },
    });

    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    await this.databaseService.region.update({
      where: {
        id,
      },
      data: updateRegionDto,
    });

    return {
      status: true,
      message: 'Region Updated Successfully',
    };
  }

  async remove(id: number) {
    const region = await this.databaseService.region.findUnique({
      where: {
        id,
      },
    });

    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    await this.databaseService.region.delete({
      where: {
        id,
      },
    });

    return {
      status: true,
      message: 'Region Deleted Successfully',
    };
  }
}
