import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalGovernmentArea, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { ValidationUtil } from '../../utils/validation.util';
@Injectable()
export class LocalGovernmentAreaService {
  constructor(private readonly databaseService: DatabaseService) {}

  async searchLGAs(query: string): Promise<{
    status: boolean;
    message: string;
    data: LocalGovernmentArea[];
  }> {
    try {
      const lgas = await this.databaseService.localGovernmentArea.findMany({
        where: {
          OR: [{ name: { contains: query, mode: 'insensitive' } }],
        },
        include: {
          region: true,
        },
      });

      return {
        status: true,
        message: 'Search Results Available',
        data: lgas,
      };
    } catch (error) {
      throw new Error(`Error searching regions: ${error.message}`);
    }
  }

  async create(
    createLocalGovernmentAreaDto: Prisma.LocalGovernmentAreaCreateInput,
  ) {
    ValidationUtil.validateRequiredFields(
      createLocalGovernmentAreaDto,
      ['name'],
      'LocalGovernmentArea',
    );
    const lga = await this.databaseService.state.findUnique({
      where: {
        name: createLocalGovernmentAreaDto.name,
      },
    });
    if (lga)
      throw new ConflictException('Local Government Area Already Exists');

    const newLga = await this.databaseService.localGovernmentArea.create({
      data: createLocalGovernmentAreaDto,
    });

    return {
      status: true,
      message: 'State Created Successfully',
      data: newLga,
    };
  }

  async getLgas() {
    const cachedData = await this.findAll();
    return cachedData;
  }

  async findAll() {
    return this.databaseService.localGovernmentArea.findMany();
  }

  async getLgaById(id: number) {
    const cachedData = await this.findOne(id);
    return cachedData;
  }
  async findOne(id: number) {
    const lgaId = await this.databaseService.localGovernmentArea.findUnique({
      where: {
        id,
      },
      include: {
        state: true,
      },
    });

    if (!lgaId) throw new NotFoundException('Local Government Area not found');
    return {
      status: true,
      message: 'Local Government Area retrieved successfully',
      data: lgaId,
    };
  }

  async update(
    id: number,
    updateLocalGovernMentAreaDto: Prisma.LocalGovernmentAreaUpdateInput,
  ) {
    const lga = await this.databaseService.localGovernmentArea.findUnique({
      where: {
        id,
      },
    });
    if (!lga) {
      throw new NotFoundException(
        `Local Government Area with ID ${id} not found`,
      );
    }
    await this.databaseService.localGovernmentArea.update({
      where: {
        id,
      },
      data: updateLocalGovernMentAreaDto,
    });

    return {
      status: true,
      message: 'Local Government Area Updated Successfully',
    };
  }

  async remove(id: number) {
    const lga = await this.databaseService.localGovernmentArea.findUnique({
      where: {
        id,
      },
    });

    if (!lga) {
      throw new NotFoundException(
        `Local Government Area with ID ${id} not found`,
      );
    }

    await this.databaseService.localGovernmentArea.delete({
      where: {
        id,
      },
    });

    return {
      status: true,
      message: 'Local Government Area Deleted Successfully',
    };
  }
}
