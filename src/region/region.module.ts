import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyMiddleware } from 'middleware/api-key.middleware';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [RegionController],
  providers: [RegionService, AuthService, JwtService],
})
export class RegionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('region');
  }
}
