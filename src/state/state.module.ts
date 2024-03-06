import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ApiKeyMiddleware } from 'middleware/api-key.middleware';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StateController],
  providers: [StateService, AuthService],
})
export class StateModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('state');
  }
}
