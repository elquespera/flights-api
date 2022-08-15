interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

type DataLoadedCallback = (data: any) => void;

type GPSAquiredCallback = (data: any) => void; 


interface AirportEntity {
  id: number;
  iata: string;
  name: string;
  stripped_name: string;
  city: string;
  country: string;
  
  icao?: string;
  location?: string;
  street_number?: string;
  street?: string;
  state?: string;
  country_iso?: string;
  county?: string;
  postal_code?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  uct?: number;
  website?: string;

  distance?: number;
}


export type { GPSCoordinates, GPSAquiredCallback, DataLoadedCallback, AirportEntity };