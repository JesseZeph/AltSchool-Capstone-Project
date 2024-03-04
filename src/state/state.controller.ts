import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StateService } from './state.service';
import { Prisma } from '@prisma/client';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post('add')
  create(@Body() createStateDto: Prisma.StateCreateInput) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
