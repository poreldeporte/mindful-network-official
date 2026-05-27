"use client";

import { Loader2, Mail, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SubscribePopoverProps {
	isOpen: boolean;
	onClose: () => void;
	anchorEl: HTMLButtonElement | null;
}

type Status =
	| { kind: "idle" }
	| { kind: "submitting" }
	| { kind: "success"; alreadySubscribed: boolean }
	| { kind: "error"; message: string };

const focusableSelector =
	"button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

const BODY_COPY =
	"The good stuff — blog posts, provider spotlights, events & wellness resources — straight to your inbox.";

export function SubscribePopover({
	isOpen,
	onClose,
	anchorEl,
}: SubscribePopoverProps) {
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<Status>({ kind: "idle" });
	const [isMounted, setIsMounted] = useState(false);
	const [isDesktop, setIsDesktop] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(min-width: 1024px)").matches;
	});
	const [desktopPosition, setDesktopPosition] = useState<{
		top: number;
		right: number;
	} | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const firstNameInputRef = useRef<HTMLInputElement | null>(null);

	const handleClose = useCallback(() => {
		onClose();
		anchorEl?.focus();
	}, [onClose, anchorEl]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)");
		const update = () => setIsDesktop(mediaQuery.matches);
		update();
		mediaQuery.addEventListener("change", update);
		return () => mediaQuery.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		setStatus({ kind: "idle" });
		setFirstName("");
		setEmail("");
		requestAnimationFrame(() => {
			firstNameInputRef.current?.focus();
		});
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen || !isDesktop || !anchorEl) {
			setDesktopPosition(null);
			return;
		}

		const updatePosition = () => {
			const rect = anchorEl.getBoundingClientRect();
			setDesktopPosition({
				top: rect.bottom + 12,
				right: Math.max(16, window.innerWidth - rect.right),
			});
		};

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);
		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [isOpen, isDesktop, anchorEl]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				handleClose();
				return;
			}

			if (event.key !== "Tab") return;

			const container = containerRef.current;
			if (!container) return;
			if (!container.contains(document.activeElement)) return;

			const focusable = Array.from(
				container.querySelectorAll<HTMLElement>(focusableSelector)
			).filter((el) => !el.hasAttribute("disabled"));

			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		const handlePointerDown = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node | null;
			if (
				(containerRef.current && containerRef.current.contains(target)) ||
				(anchorEl && anchorEl.contains(target))
			) {
				return;
			}
			handleClose();
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("touchstart", handlePointerDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("touchstart", handlePointerDown);
		};
	}, [isOpen, anchorEl, handleClose]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (status.kind === "submitting") return;

		setStatus({ kind: "submitting" });

		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, firstName }),
			});

			const data = await response.json().catch(() => null);

			if (!response.ok) {
				setStatus({
					kind: "error",
					message:
						data?.error ||
						"We couldn't sign you up right now. Please try again shortly.",
				});
				return;
			}

			setStatus({
				kind: "success",
				alreadySubscribed: Boolean(data?.alreadySubscribed),
			});
		} catch {
			setStatus({
				kind: "error",
				message: "Network error — please try again.",
			});
		}
	};

	if (!isOpen || !isMounted) return null;
	if (isDesktop && !desktopPosition) return null;

	const isSubmitting = status.kind === "submitting";
	const isSuccess = status.kind === "success";

	const content = (
		<>
			<div
				className="fixed inset-0 z-[60] bg-black/20 lg:hidden"
				aria-hidden="true"
				onClick={handleClose}
			/>
			<div
				ref={containerRef}
				role="dialog"
				aria-label="Subscribe to the newsletter"
				className="fixed inset-x-0 bottom-0 z-[70] w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-white shadow-2xl lg:inset-auto lg:w-[22rem] lg:rounded-2xl"
				style={
					isDesktop && desktopPosition
						? { top: desktopPosition.top, right: desktopPosition.right }
						: undefined
				}
			>
				<div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
					<div className="flex items-center gap-2">
						<Mail className="h-4 w-4 text-blue-600" />
						<span className="text-sm font-semibold text-gray-800">
							Stay Connected
						</span>
					</div>
					<button
						type="button"
						onClick={handleClose}
						className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100"
						aria-label="Close subscribe form"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<div className="space-y-4 px-5 py-4">
					<p className="text-xs leading-relaxed text-gray-600">{BODY_COPY}</p>

					{isSuccess ? (
						<div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-800">
							{status.alreadySubscribed
								? "You're already on the list — thanks for staying connected!"
								: "You're in! Check your inbox — your newsletter is on the way."}
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-3" noValidate>
							<label htmlFor="newsletter-first-name" className="sr-only">
								First name
							</label>
							<input
								ref={firstNameInputRef}
								id="newsletter-first-name"
								type="text"
								required
								autoComplete="given-name"
								placeholder="First name"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.target.value);
									if (status.kind === "error") setStatus({ kind: "idle" });
								}}
								disabled={isSubmitting}
								className="h-10 w-full rounded-full border border-gray-200 bg-white px-4 text-xs text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
								aria-invalid={status.kind === "error"}
							/>

							<label htmlFor="newsletter-email" className="sr-only">
								Email address
							</label>
							<input
								id="newsletter-email"
								type="email"
								required
								autoComplete="email"
								inputMode="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (status.kind === "error") setStatus({ kind: "idle" });
								}}
								disabled={isSubmitting}
								className="h-10 w-full rounded-full border border-gray-200 bg-white px-4 text-xs text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
								aria-invalid={status.kind === "error"}
							/>

							{status.kind === "error" && (
								<p className="text-xs text-red-600" role="alert">
									{status.message}
								</p>
							)}

							<button
								type="submit"
								disabled={
									isSubmitting ||
									firstName.trim().length === 0 ||
									email.trim().length === 0
								}
								className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
							>
								{isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
								{isSubmitting ? "Subscribing…" : "Subscribe"}
							</button>
						</form>
					)}
				</div>
			</div>
		</>
	);

	return createPortal(content, document.body);
}
