/**
 * Validates GPS coordinates to prevent invalid data entry.
 * Used in both admin form (client-side) and API route (server-side).
 */
export function validateCoordinates(
  lat: number | null | undefined,
  lng: number | null | undefined
): { valid: boolean; error?: string } {
  if (lat === null || lat === undefined || lng === null || lng === undefined) {
    return { valid: true }; // nullable coords are fine
  }

  if (isNaN(lat) || isNaN(lng)) {
    return { valid: false, error: 'Coordinates must be valid numbers.' };
  }

  if (lat < -90 || lat > 90) {
    return { valid: false, error: `Latitude ${lat} is out of range (-90 to 90).` };
  }

  if (lng < -180 || lng > 180) {
    return { valid: false, error: `Longitude ${lng} is out of range (-180 to 180).` };
  }

  return { valid: true };
}
