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
import { StateService } from './state.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { MyLoggerService } from '../my-logger/my-logger.service';

@UseInterceptors(CacheInterceptor)
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}
  private readonly logger = new MyLoggerService(StateController.name);

  @Post('add')
  create(@Body() createStateDto: Prisma.StateCreateInput) {
    return this.stateService.create(createStateDto);
  }
  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get()
  findAll(@Ip() ip: string) {
    this.logger.log(`Request for ALL \t${ip} address`, StateController.name);
    return this.stateService.findAll();
  }

  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get(':id')
  findOne(@Param('id') id: string, @Ip() ip: string) {
    this.logger.log(`Request for ALL \t${ip} address`, StateController.name);
    return this.stateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStateDto: Prisma.StateUpdateInput,
  ) {
    return this.stateService.update(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}
