import { Module } from '@nestjs/common';
import { VenuesModule } from './venues/venues.module';
@Module({
  imports: [VenuesModule],
})
export class AppModule {}
