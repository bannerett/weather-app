export interface CitiesResponse {
  data: CityData[];
  metadata: Metadata;
}

export interface Metadata {
  currentOffset: number;
  totalCount: number;
}

export interface CityData {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}
