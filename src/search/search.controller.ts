import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SearchService } from './search.service';
import { LocalGovernmentArea, Region, State } from '@prisma/client';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query('query') query: string): Promise<{
    status: boolean;
    message: string;
    regions?: Region[];
    states?: State[];
    lgas?: LocalGovernmentArea[];
  }> {
    return this.searchService.search(query);
  }
}
