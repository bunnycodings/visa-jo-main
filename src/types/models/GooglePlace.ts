export interface GooglePlace {
  id?: number;
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
  rating?: number | null;
  userRatingsTotal?: number | null;
  priceLevel?: number | null;
  photos?: string[] | null;
  lastUpdated?: Date;
  isActive: boolean;
}

export interface PlaceSearchResult {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  photos?: string[];
}