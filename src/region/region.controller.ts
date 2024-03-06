import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Prisma } from '@prisma/client';
import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post('add')
  async create(@Body() createRegionDto: Prisma.RegionCreateInput) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  findAll() {
    console.log('Inside controller');
    return this.regionService.getRegions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
