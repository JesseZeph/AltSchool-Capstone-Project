import { Injectable, NotFoundException } from '@nestjs/common';
import { RegionService } from 'src/region/region.service';
import { StateService } from 'src/state/state.service';
import { LocalGovernmentAreaService } from '../local-government-area/local-government-area.service';
import { LocalGovernmentArea, Region, State } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(
    private readonly regionService: RegionService,
    private readonly stateService: StateService,
    private readonly lgaService: LocalGovernmentAreaService,
  ) {}

  async search(query: string): Promise<{
    status: boolean;
    message: string;
    regions?: Region[];
    states?: State[];
    lgas?: LocalGovernmentArea[];
  }> {
    try {
      let regions: Region[] = [];
      let states: State[] = [];
      let lgas: LocalGovernmentArea[] = [];

      switch (true) {
        case !!query:
          regions = (await this.regionService.searchRegions(query)).data;
          states = (await this.stateService.searchStates(query)).data;
          lgas = (await this.lgaService.searchLGAs(query)).data;
          break;

        default:
          return {
            status: false,
            message: 'No search results found',
          };
      }

      return {
        status: true,
        message: 'Search Results',
        regions: regions.length > 0 ? regions : undefined,
        states: states.length > 0 ? states : undefined,
        lgas: lgas.length > 0 ? lgas : undefined,
      };
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
}
