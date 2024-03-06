import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { RegionService } from 'src/region/region.service';
import { DatabaseModule } from 'src/database/database.module';
import { RegionModule } from 'src/region/region.module';
import { StateModule } from 'src/state/state.module';
import { LocalGovernmentAreaModule } from 'src/local-government-area/local-government-area.module';
import { LocalGovernmentAreaService } from 'src/local-government-area/local-government-area.service';
import { StateService } from 'src/state/state.service';
import { ApiKeyMiddleware } from 'middleware/api-key.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    DatabaseModule,
    RegionModule,
    StateModule,
    LocalGovernmentAreaModule,
  ],
  controllers: [SearchController],
  providers: [
    SearchService,
    RegionService,
    StateService,
    LocalGovernmentAreaService,
    AuthService,
  ],
})
export class SearchModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('search');
  }
}
