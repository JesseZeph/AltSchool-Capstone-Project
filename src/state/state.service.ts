import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, State } from '@prisma/client';
import { ValidationUtil } from 'utils/validation.util';

@Injectable()
export class StateService {
  constructor(private readonly databaseService: DatabaseService) {}

  async searchStates(
    query: string,
  ): Promise<{ status: boolean; message: string; data: State[] }> {
    try {
      const states = await this.databaseService.state.findMany({
        where: {
          OR: [{ name: { contains: query, mode: 'insensitive' } }],
        },
        include: {
          localGovernmentAreas: true,
        },
      });

      return {
        status: true,
        message: 'Search Results Available',
        data: states,
      };
    } catch (error) {
      throw new Error(`Error searching regions: ${error.message}`);
    }
  }

  async create(createStateDto: Prisma.StateCreateInput) {
    ValidationUtil.validateRequiredFields(
      createStateDto,
      ['governor', 'name', 'capitalCity', 'senatorialDistrict'],
      'State',
    );

    const state = await this.databaseService.state.findUnique({
      where: {
        name: createStateDto.name,
      },
    });

    if (state) throw new ConflictException('State Already Exists');

    const newState = await this.databaseService.state.create({
      data: createStateDto,
    });

    return {
      status: true,
      message: 'State Created Successfully',
      data: newState,
    };
  }

  async getState() {
    const cachedData = await this.findAll();
    return cachedData;
  }

  async findAll() {
    return this.databaseService.state.findMany();
  }
  async getStateById(id: number) {
    const cachedData = await this.findOne(id);
    return cachedData;
  }

  async findOne(id: number) {
    const stateId = await this.databaseService.state.findUnique({
      where: {
        id,
      },
      include: {
        localGovernmentAreas: true,
      },
    });

    if (!stateId) throw new NotFoundException('State not found');
    return {
      status: true,
      message: 'State retrieved successfully',
      data: stateId,
    };
  }

  async update(id: number, updateStateDto: Prisma.StateUpdateInput) {
    const state = await this.databaseService.state.findUnique({
      where: {
        id,
      },
    });
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    await this.databaseService.state.update({
      where: {
        id,
      },
      data: updateStateDto,
    });

    return {
      status: true,
      message: 'State Updated Successfully',
    };
  }

  async remove(id: number) {
    await this.databaseService.localGovernmentArea.deleteMany({
      where: {
        stateId: id,
      },
    });
    const state = await this.databaseService.state.findUnique({
      where: {
        id,
      },
    });
    if (!state) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    await this.databaseService.state.delete({
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
