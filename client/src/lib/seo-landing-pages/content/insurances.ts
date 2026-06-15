import type { FacetBlock } from "./types";

// Insurance facet blocks, keyed by InsuranceConfig.slug (see config.ts INSURANCES).
// Not yet authored — insurance pages render live stats only until blocks are
// added here in Phase 1. Author city-agnostic copy; use {city}.
export const INSURANCE_CONTENT: Record<string, FacetBlock> = {};
