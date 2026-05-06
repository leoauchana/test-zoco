import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LogsModule } from './logs/logs.module';
import { SyncModule } from './sync/sync.module';
import { VenuesModule } from './venues/venues.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    VenuesModule,
    SyncModule,
    LogsModule,
  ],
})
export class AppModule {}
