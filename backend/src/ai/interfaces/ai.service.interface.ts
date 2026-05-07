export interface ExistingVenue {
  id: string;
  name: string;
}

export interface VenueAnalysis {
  isDuplicate: boolean;
  confidence: string;
  category: string;
  description: string;
}

export interface IAiService {
  analyzeVenue(
    newName: string,
    location: string,
    existingVenues: ExistingVenue[],
  ): Promise<VenueAnalysis>;
}
