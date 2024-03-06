import { Controller, Get, Query, UseInterceptors, Ip } from '@nestjs/common';
import { SearchService } from './search.service';
import { LocalGovernmentArea, Region, State } from '@prisma/client';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
@UseInterceptors(CacheInterceptor)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  private readonly logger = new MyLoggerService(SearchController.name);

  @Throttle({ short: { ttl: 1000, limit: 10 } })
  @Get()
  search(
    @Query('query') query: string,
    @Ip() ip: string,
  ): Promise<{
    status: boolean;
    message: string;
    regions?: Region[];
    states?: State[];
    lgas?: LocalGovernmentArea[];
  }> {
    this.logger.log(`Request for ALL \t${ip} address`, SearchController.name);
    return this.searchService.search(query);
  }
}
