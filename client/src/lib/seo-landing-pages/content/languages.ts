import type { FacetBlock } from "./types";

// Language facet blocks, keyed by LanguageConfig.slug (see config.ts LANGUAGES).
// Not yet authored — language pages render live stats only until blocks are
// added here in Phase 1. Author city-agnostic copy; use {city}.
export const LANGUAGE_CONTENT: Record<string, FacetBlock> = {};
