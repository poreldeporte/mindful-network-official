// Interfaces for Eventbrite API Response

export interface EventbriteEventsResponse {
	pagination: Pagination;
	events: EventbriteEvent[];
}

export interface Pagination {
	object_count: number;
	page_number: number;
	page_size: number;
	page_count: number;
	has_more_items: boolean;
}

export interface EventbriteEvent {
	id: string;
	name: TextContent;
	description: TextContent;
	url: string;
	start: EventDateTime;
	end: EventDateTime;
	organization_id: string;
	created: string;
	changed: string;
	published: string;
	capacity: number;
	capacity_is_custom: boolean;
	status: string;
	currency: string;
	listed: boolean;
	shareable: boolean;
	online_event: boolean;
	tx_time_limit: number;
	hide_start_date: boolean;
	hide_end_date: boolean;
	locale: string;
	is_locked: boolean;
	privacy_setting: string;
	is_series: boolean;
	is_series_parent: boolean;
	inventory_type: string;
	is_reserved_seating: boolean;
	show_pick_a_seat: boolean;
	show_seatmap_thumbnail: boolean;
	show_colors_in_seatmap_thumbnail: boolean;
	source: string;
	is_free: boolean;
	version: string;
	summary: string;
	facebook_event_id: string | null;
	logo_id: string;
	organizer_id: string;
	venue: Venue | null;
	online_event_details?: OnlineEventDetails;
	format_id: string;
	format: Format;
	category_id: string;
	category: Category;
	subcategory_id: string;
	subcategory: Category;
	price_range: PriceRange;
	logo: Logo;
}

export interface TextContent {
	text: string;
	html: string;
}

export interface EventDateTime {
	timezone: string;
	local: string;
	utc: string;
}

export interface Venue {
	id: string;
	name: string;
	address: Address;
	capacity: number;
	venue_type: string;
}

export interface Address {
	address_1: string;
	address_2: string | null;
	city: string;
	region: string;
	postal_code: string;
	country: string;
	latitude: string;
	longitude: string;
}

export interface OnlineEventDetails {
	online_event_url: string;
	online_event_type: string;
	online_event_third_party: boolean;
}

export interface Format {
	id: string;
	name: string;
	name_localized: string;
	short_name: string;
	short_name_localized: string;
}

export interface Category {
	id: string;
	name: string;
	name_localized: string;
	short_name: string;
	short_name_localized: string;
}

export interface PriceRange {
	min: string;
	max: string;
	currency: string;
}

export interface Logo {
	url: string;
}

// Optional: Define more specific types for string enums if needed
export type EventStatus =
	| "live"
	| "draft"
	| "started"
	| "ended"
	| "completed"
	| "canceled";
export type PrivacySetting = "unlocked" | "locked";
export type InventoryType = "limited" | "unlimited";
export type VenueType = "physical" | "virtual";

// Example usage with type checking
// const events: EventbriteEventsResponse = eventbriteEvents;
