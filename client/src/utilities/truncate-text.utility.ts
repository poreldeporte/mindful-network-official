export function truncateText(
	text: string,
	maxLength: number,
	addEllipsis: boolean = true
): string {
	if (!text) return "";

	if (text.length <= maxLength) return text;

	const lastSpace = text.substring(0, maxLength).lastIndexOf(" ");

	const cutPosition = lastSpace > 0 ? lastSpace : maxLength;

	return text.substring(0, cutPosition) + (addEllipsis ? "..." : "");
}
