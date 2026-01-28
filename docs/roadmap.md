# Sanity CMS Reorganization Roadmap

## Goals
- Reduce schema duplication and naming drift
- Make Studio structure predictable for editors
- Align content types with API usage
- Improve data quality and validation

## Phase 0: Discovery and decisions
- Inventory all schemas and where they are queried in the app
- Decide model strategy:
  - Option A: Consolidated listing (recommended)
  - Option B: Shared base fields (lower migration risk)
- Identify migration scope and a backwards-compatibility window

## Phase 1: Quick wins (no migration)
- Register missing resource listing schemas in `backend/schemaTypes/index.js`
- Reorganize desk structure into sections: Settings, Content, Listings, Taxonomy
- Normalize field titles and add consistent previews (name, city/state, category)
- Convert `usefulLinks.links.url` to URL type with validation
- Convert `companyDetails` into a singleton `siteSettings` with grouped sections

## Phase 2: Schema refactor
### Option A: Consolidated listing (recommended)
- Create `listing` document with:
  - `listingType` (professional, facility, lawyer)
  - `category` (references `resourceCategory`)
  - Shared objects: `contact`, `address`, `media`, `services`
- Rename taxonomy `resources` -> `resourceCategory` (or `resourceTag`)
- Standardize fields:
  - `therapyOptions` -> `therapyModalities`
  - `conditionSpecialty` -> `conditions`
  - `ageSpecialty` -> `ageGroups`
  - `degree` -> `credential`

### Option B: Shared base fields (lower migration risk)
- Keep current listing types but extract shared `listingFields` object
- Normalize field names and mark old names as deprecated
- Add shared `address`, `contact`, and `media` objects

## Phase 3: Migration
- Write a migration script to map old types to the new model
- Backfill `slug`, `category`, and normalized field names
- Validate references and required fields after migration
- Keep old types read-only during cutover

## Phase 4: Query and app updates
- Update GROQ queries and API routes to new types/fields
- Add explicit projections to reduce overfetching
- Update search and filters to use normalized fields

## Phase 5: Governance and maintenance
- Add required field validation and editor guidance
- Add `status`, `lastReviewed`, and `source` to listings
- Document schema conventions and naming rules in `/docs`

## Definition of done
- Studio shows grouped sections and consistent previews
- Listing content uses a single schema model (or shared base)
- Client queries and API routes updated
- Migration verified with spot checks
- Editors confirm workflow improvements
