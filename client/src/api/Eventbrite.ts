export class Eventbrite {
	private readonly baseUrl = "https://www.eventbriteapi.com/v3";
	private readonly token: string;

	constructor(token: string) {
		this.token = token;
	}

	private async fetchWithAuth(endpoint: string) {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
				"Content-Type": "application/json",
			},
		});

		return response.json();
	}

	async getAllEvents(organizationId: string) {
		try {
			const events = await this.fetchWithAuth(
				`/organizations/${organizationId}/events`
			);
			return events;
		} catch (error) {
			console.error("Error fetching all events:", error);
			throw error;
		}
	}

	async getEventById(eventId: string) {
		try {
			const event = await this.fetchWithAuth(`/events/${eventId}`);
			return event;
		} catch (error) {
			console.error("Error fetching event by ID:", error);
			throw error;
		}
	}

	async getVenueById(venueId: string) {
		try {
			const venue = await this.fetchWithAuth(`/venues/${venueId}`);
			return venue;
		} catch (error) {
			console.error("Error fetching venue by ID:", error);
			throw error;
		}
	}

	async getEventWithVenue(eventId: string) {
		try {
			const event = await this.getEventById(eventId);

			if (event.venue_id) {
				const venue = await this.getVenueById(event.venue_id);

				return {
					...event,
					venue: venue,
				};
			}

			return event;
		} catch (error) {
			console.error("Error fetching event with venue:", error);
			throw error;
		}
	}

	async getMyOrganizations() {
		try {
			const organizations = await this.fetchWithAuth(
				"/users/me/organizations/"
			);
			return organizations;
		} catch (error) {
			console.error("Error obteniendo las organizaciones:", error);
			throw error;
		}
	}
}
