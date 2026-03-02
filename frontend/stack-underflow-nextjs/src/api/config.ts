// ========================= API CONFIGURATION =========================
// Selects implementation based on NEXT_PUBLIC_API_LAYER environment variable
//
// Options:
// - fake:  Simulates API with random delays and occasional errors (testing UI states)
// - mock:  In-memory data store with predictable responses (development)
// - real:  Actual backend API calls (production)

export type APILayer = "fake" | "mock" | "real";

// Environment variables (client-side safe)
const env = typeof window !== "undefined" ? (window as unknown as { env?: Record<string, string> }).env || {} : {};

export const API_LAYER: APILayer = (env.NEXT_PUBLIC_API_LAYER as APILayer) || "mock";
export const API_URL = env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Log which API layer is being used (client-side only)
if (typeof window !== "undefined") {
  console.log(`[API Config] Using ${API_LAYER} API layer`);
}
