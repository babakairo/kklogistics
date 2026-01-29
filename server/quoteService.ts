/**
 * Quote Service: Calculate quotes based on postcode-to-postcode routes.
 * Uses Google Routes API (mileage-engine reference implementation).
 */

import axios from 'axios';

interface QuoteResult {
  origin: string;
  destination: string;
  distance_miles: number;
  duration_minutes: number | null;
  quote: {
    currency: string;
    total: number;
    breakdown: {
      base_fee: number;
      per_mile: number;
      distance_miles: number;
      subtotal: number;
      minimum_charge: number;
    };
  };
  source: 'cache' | 'api';
}

interface PostcodeQuoteRequest {
  origin: string;
  destination: string;
  priceConfig?: {
    base_fee?: number;
    per_mile?: number;
    minimum_charge?: number;
  };
}

// Pricing defaults (GBP)
const DEFAULT_PRICING = {
  currency: 'GBP',
  base_fee: 10.0,
  per_mile: 1.2,
  minimum_charge: 25.0,
};

/**
 * Normalize UK postcode: remove spaces, then add space at correct position.
 */
function normalizePostcode(pc: string): string {
  let normalized = pc.trim().toUpperCase().replace(/\s+/g, '');
  if (normalized.length > 3) {
    normalized = normalized.slice(0, -3) + ' ' + normalized.slice(-3);
  }
  return normalized;
}

/**
 * Simple UK postcode validation using regex.
 */
function validatePostcode(pc: string): boolean {
  const postcodeRegex = /^(GIR 0AA|[A-PR-UWYZ](?:[0-9]{1,2}|[A-HK-Y][0-9]{1,2}|[0-9][A-HJKSTUW]|[A-HK-Y][0-9][ABEHMNPRV-Y])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
  return postcodeRegex.test(pc);
}

/**
 * Calculate distance and quote between two UK postcodes.
 * Uses Google Routes API via direct HTTP call.
 */
export async function generatePostcodeQuote(
  req: PostcodeQuoteRequest
): Promise<QuoteResult> {
  const originNorm = normalizePostcode(req.origin);
  const destNorm = normalizePostcode(req.destination);

  if (!validatePostcode(originNorm)) {
    throw new Error(`Invalid origin postcode: ${req.origin}`);
  }
  if (!validatePostcode(destNorm)) {
    throw new Error(`Invalid destination postcode: ${req.destination}`);
  }

  // Same postcode = 0 miles
  if (originNorm === destNorm) {
    const pricing = { ...DEFAULT_PRICING, ...req.priceConfig };
    return {
      origin: originNorm,
      destination: destNorm,
      distance_miles: 0,
      duration_minutes: 0,
      quote: {
        currency: pricing.currency,
        total: pricing.minimum_charge,
        breakdown: {
          base_fee: pricing.base_fee,
          per_mile: pricing.per_mile,
          distance_miles: 0,
          subtotal: pricing.base_fee,
          minimum_charge: pricing.minimum_charge,
        },
      },
      source: 'api',
    };
  }

  // Call Google Routes API directly
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY not configured');
  }

  const headers = {
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
    'Content-Type': 'application/json',
  };

  const body = {
    origin: { address: `${originNorm}, UK` },
    destination: { address: `${destNorm}, UK` },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE',
  };

  let distanceMeters: number | null = null;
  let durationSeconds: number | null = null;

  try {
    const response = await axios.post(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      body,
      { headers, timeout: 10000 }
    );

    if (response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      distanceMeters = route.distanceMeters || 0;

      // Extract duration (may be in different formats)
      if (route.duration) {
        if (typeof route.duration === 'object' && route.duration.seconds) {
          durationSeconds = route.duration.seconds;
        } else if (typeof route.duration === 'string') {
          // Parse ISO 8601 duration like "1234s"
          const match = route.duration.match(/(\d+)s/);
          if (match) durationSeconds = parseInt(match[1], 10);
        }
      }
    } else {
      throw new Error('No routes found between postcodes');
    }
  } catch (error: any) {
    // Log detailed error for debugging
    if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    } else if (error.response?.status === 400) {
      throw new Error(`Bad request: ${error.response.data?.error?.message || 'invalid postcodes'}`);
    } else if (error.response?.status === 429) {
      throw new Error('Rate limited; please try again in a moment');
    }
    throw new Error(`Distance calculation failed: ${error.message}`);
  }

  if (distanceMeters === null) {
    throw new Error('Could not determine distance');
  }

  // Convert meters to miles
  const miles = Math.round((distanceMeters / 1609.344) * 100) / 100;
  const minutes = durationSeconds ? Math.round(durationSeconds / 60 * 10) / 10 : null;

  // Apply pricing
  const pricing = { ...DEFAULT_PRICING, ...req.priceConfig };
  const subtotal = pricing.base_fee + pricing.per_mile * miles;
  const total = Math.max(pricing.minimum_charge, subtotal);

  return {
    origin: originNorm,
    destination: destNorm,
    distance_miles: miles,
    duration_minutes: minutes,
    quote: {
      currency: pricing.currency,
      total: Math.round(total * 100) / 100,
      breakdown: {
        base_fee: pricing.base_fee,
        per_mile: pricing.per_mile,
        distance_miles: miles,
        subtotal: Math.round(subtotal * 100) / 100,
        minimum_charge: pricing.minimum_charge,
      },
    },
    source: 'api',
  };
}
