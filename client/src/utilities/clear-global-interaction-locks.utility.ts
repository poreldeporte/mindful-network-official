export const clearGlobalInteractionLocks = () => {
	if (typeof document === "undefined") return;

	// Some modal/select libraries can leave these inline locks behind after
	// route transitions, which makes the page appear non-clickable.
	document.body.style.removeProperty("pointer-events");
	document.documentElement.style.removeProperty("pointer-events");
	document.body.style.removeProperty("overflow");
	document.documentElement.style.removeProperty("overflow");

	document.body.removeAttribute("data-scroll-locked");
	document.documentElement.removeAttribute("data-scroll-locked");
	document.body.removeAttribute("data-radix-scroll-lock");
	document.documentElement.removeAttribute("data-radix-scroll-lock");
	document.body.removeAttribute("inert");
	document.documentElement.removeAttribute("inert");
};
