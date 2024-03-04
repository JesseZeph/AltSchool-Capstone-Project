import { Module } from '@nestjs/common';
import { LocalGovernmentAreaService } from './local-government-area.service';
import { LocalGovernmentAreaController } from './local-government-area.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalGovernmentAreaController],
  providers: [LocalGovernmentAreaService],
})
export class LocalGovernmentAreaModule {}
