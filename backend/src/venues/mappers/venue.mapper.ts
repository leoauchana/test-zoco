import { Injectable } from '@nestjs/common';
import { Venue } from '@prisma/client';
import { VenueResponseDto } from '../dto/response-venues.dto';

@Injectable()
export class VenuesMapper {
  toPrismaToResponse(venue: Venue): VenueResponseDto {
    return {
      id: venue.id,
      name: venue.name,
      location: venue.location,
      category: venue.category,
      description: venue.description,
      source: venue.source,
      active: venue.active,
      obtainedAt: venue.obtainedAt,
    };
  }

  toPrismaToResponseArray(venues: Venue[]): VenueResponseDto[] {
    return venues.map((venue) => this.toPrismaToResponse(venue));
  }
}
