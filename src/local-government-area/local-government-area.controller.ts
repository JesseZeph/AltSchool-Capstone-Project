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
import { LocalGovernmentAreaService } from './local-government-area.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MyLoggerService } from '../my-logger/my-logger.service';

// @UseInterceptors(CacheInterceptor)
@Controller('lga')
export class LocalGovernmentAreaController {
  constructor(
    private readonly localGovernmentAreaService: LocalGovernmentAreaService,
  ) {}
  private readonly logger = new MyLoggerService(
    LocalGovernmentAreaController.name,
  );

  @Post('add')
  create(
    @Body() createLocalGovernmentAreaDto: Prisma.LocalGovernmentAreaCreateInput,
  ) {
    return this.localGovernmentAreaService.create(createLocalGovernmentAreaDto);
  }

  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get()
  findAll(@Ip() ip: string) {
    this.logger.log(
      `Request for \t${ip} address`,
      LocalGovernmentAreaController.name,
    );
    return this.localGovernmentAreaService.findAll();
  }

  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get(':id')
  findOne(@Param('id') id: string, @Ip() ip: string) {
    this.logger.log(
      `Request for \t${ip} address`,
      LocalGovernmentAreaController.name,
    );
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
