/**
 * Geolocation & Proximity Utilities for VISTA
 * Supports real browser GPS coordinates, distance calculation, compass bearings,
 * and demo-mode GPS simulation for testing in any environment.
 */

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

// Default center coordinates for key destinations
export const CITY_COORDINATES: Record<string, GeoCoordinate> = {
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Jodhpur: { lat: 26.2389, lng: 73.0243 },
  Bhuj: { lat: 23.242, lng: 69.6669 },
  Surat: { lat: 21.1702, lng: 72.8311 },
  Kochi: { lat: 9.9312, lng: 76.2673 },
  Amritsar: { lat: 31.634, lng: 74.8723 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Varanasi: { lat: 25.3176, lng: 82.9739 },
  Mumbai: { lat: 18.922, lng: 72.8347 },
  Mysuru: { lat: 12.2958, lng: 76.6394 }
};

/**
 * Calculates distance in meters between two lat/lng points using the Haversine formula
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Human-readable distance formatting (e.g. "85 m", "1.4 km")
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Cardinal compass bearing between two points
 */
export function getCompassBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos(dLon);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  brng = (brng + 360) % 360;

  const bearings = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(brng / 45) % 8;
  return bearings[index];
}

/**
 * Proximity threshold: within 120 meters is considered "arrived"
 */
export const ARRIVAL_RADIUS_METERS = 150;
