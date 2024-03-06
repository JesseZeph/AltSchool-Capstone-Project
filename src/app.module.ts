import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LoginAuthModule } from './login-auth/login-auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { RegionModule } from './region/region.module';
import { StateModule } from './state/state.module';
import { LocalGovernmentAreaModule } from './local-government-area/local-government-area.module';
import { SearchModule } from './search/search.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 3000,
      store: redisStore,
      // useFactory: async () => ({
      //   store: redisStore as any,
      //   host: '127.0.0.1:6379',
      //   port: 6379,
      //   ttl: 3000,
      // }),
    }),
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    LoginAuthModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 2 },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MyLoggerModule,
    RegionModule,
    StateModule,
    LocalGovernmentAreaModule,
    SearchModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
