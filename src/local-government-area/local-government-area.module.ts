import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LocalGovernmentAreaService } from './local-government-area.service';
import { LocalGovernmentAreaController } from './local-government-area.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyMiddleware } from 'middleware/api-key.middleware';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalGovernmentAreaController],
  providers: [LocalGovernmentAreaService, AuthService, DatabaseService],
})
export class LocalGovernmentAreaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('lga');
  }
}
