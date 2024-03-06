import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
  UseInterceptors,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { MyLoggerService } from '../my-logger/my-logger.service';

@UseInterceptors(CacheInterceptor)
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  private readonly logger = new MyLoggerService(RegionController.name);

  @Post('add')
  async create(@Body() createRegionDto: Prisma.RegionCreateInput) {
    return this.regionService.create(createRegionDto);
  }

  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get()
  findAll(@Ip() ip: string) {
    this.logger.log(`Request for ALL \t${ip} address`, RegionController.name);
    console.log('Inside controller');
    return this.regionService.getRegions();
  }

  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get(':id')
  findOne(@Param('id') id: string, @Ip() ip: string) {
    this.logger.log(`Request for ALL \t${ip} address`, RegionController.name);
    console.log('Inside controller');
    return this.regionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: Prisma.RegionUpdateInput,
  ) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
