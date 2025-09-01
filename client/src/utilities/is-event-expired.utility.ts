export const isEventExpired = (eventEndDate: string): boolean => {
	const eventDate = new Date(eventEndDate);
	const currentDate = new Date();

	return eventDate < currentDate;
};

export const hasEventStarted = (eventStartDate: string): boolean => {
	const eventDate = new Date(eventStartDate);
	const currentDate = new Date();

	return eventDate <= currentDate;
};
