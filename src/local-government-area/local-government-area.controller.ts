import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalGovernmentAreaService } from './local-government-area.service';
import { Prisma } from '@prisma/client';

@Controller('lga')
export class LocalGovernmentAreaController {
  constructor(
    private readonly localGovernmentAreaService: LocalGovernmentAreaService,
  ) {}

  @Post('add')
  create(
    @Body() createLocalGovernmentAreaDto: Prisma.LocalGovernmentAreaCreateInput,
  ) {
    return this.localGovernmentAreaService.create(createLocalGovernmentAreaDto);
  }

  @Get()
  findAll() {
    return this.localGovernmentAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localGovernmentAreaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocalGovernmentAreaDto: Prisma.LocalGovernmentAreaUpdateInput,
  ) {
    return this.localGovernmentAreaService.update(
      +id,
      updateLocalGovernmentAreaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localGovernmentAreaService.remove(+id);
  }
}
