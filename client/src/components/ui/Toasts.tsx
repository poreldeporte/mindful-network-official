"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { X } from "lucide-react";

type ToastType = "default" | "success" | "info" | "warning" | "danger";
type ToastPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

interface Toast {
	id: string;
	message: string;
	description?: string;
	type: ToastType;
	position: ToastPosition;
	html?: string;
}

interface ToastContextProps {
	toasts: Toast[];
	addToast: (toast: Omit<Toast, "id">) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((toast: Omit<Toast, "id">) => {
		const id = `toast-${Math.random().toString(16).slice(2)}`;
		setToasts((prev) => [{ ...toast, id }, ...prev]);

		setTimeout(() => {
			removeToast(id);
		}, 4000);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	);
};

// Toast Container Component
const ToastContainer = () => {
	const { toasts, removeToast } = useContext(ToastContext)!;
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const handleRemoveToast = useCallback(
		(id: string) => {
			removeToast(id);
		},
		[removeToast]
	);

	const getPositionClasses = (position: ToastPosition): string => {
		const baseClasses = "fixed z-50 w-full sm:max-w-xs m-4";
		const positionClasses = {
			"top-left": "top-0 left-0",
			"top-center": "top-0 left-1/2 -translate-x-1/2",
			"top-right": "top-0 right-0",
			"bottom-left": "bottom-0 left-0",
			"bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
			"bottom-right": "bottom-0 right-0",
		};
		return `${baseClasses} ${positionClasses[position]}`;
	};

	const getTypeClasses = (type: ToastType): string => {
		return {
			success: "text-green-500",
			info: "text-blue-500",
			warning: "text-orange-400",
			danger: "text-red-500",
			default: "text-gray-800",
		}[type];
	};

	const ToastIcon = ({ type }: { type: ToastType }) => {
		const icons = {
			success: (
				<svg
					className="w-[18px] h-[18px] mr-1.5 -ml-1"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.7744 9.63269C17.1238 9.20501 17.0604 8.57503 16.6327 8.22559C16.2051 7.87615 15.5751 7.93957 15.2256 8.36725L10.6321 13.9892L8.65936 12.2524C8.24484 11.8874 7.61295 11.9276 7.248 12.3421C6.88304 12.7566 6.92322 13.3885 7.33774 13.7535L9.31046 15.4903C10.1612 16.2393 11.4637 16.1324 12.1808 15.2547L16.7744 9.63269Z"
						fill="currentColor"
					/>
				</svg>
			),
			info: (
				<svg
					className="w-[18px] h-[18px] mr-1.5 -ml-1"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9ZM13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V12Z"
						fill="currentColor"
					/>
				</svg>
			),
			warning: (
				<svg
					className="w-[18px] h-[18px] mr-1.5 -ml-1"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M9.44829 4.46472C10.5836 2.51208 13.4105 2.51168 14.5464 4.46401L21.5988 16.5855C22.7423 18.5509 21.3145 21 19.05 21L4.94967 21C2.68547 21 1.25762 18.5516 2.4004 16.5862L9.44829 4.46472ZM11.9995 8C12.5518 8 12.9995 8.44772 12.9995 9V13C12.9995 13.5523 12.5518 14 11.9995 14C11.4473 14 10.9995 13.5523 10.9995 13V9C10.9995 8.44772 11.4473 8 11.9995 8Z"
						fill="currentColor"
					/>
				</svg>
			),
			danger: (
				<svg
					className="w-[18px] h-[18px] mr-1.5 -ml-1"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7Z"
						fill="currentColor"
					/>
				</svg>
			),
			default: null,
		}[type];

		return <>{icons}</>;
	};

	return (
		<>
			{Object.keys(
				toasts.reduce(
					(acc, toast) => ({
						...acc,
						[toast.position]: true,
					}),
					{}
				)
			).map((position) => (
				<div
					key={position}
					className={getPositionClasses(position as ToastPosition)}
				>
					{toasts
						.filter((toast) => toast.position === position)
						.map((toast) => (
							<div
								key={toast.id}
								className="relative transform transition-all duration-300 ease-out"
								onMouseEnter={() => setHoveredId(toast.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<div className="bg-white border border-gray-100 rounded-lg shadow-lg p-4 mb-4">
									{toast.html ? (
										<div dangerouslySetInnerHTML={{ __html: toast.html }} />
									) : (
										<div className="relative">
											<div
												className={`flex items-center ${getTypeClasses(toast.type)}`}
											>
												<ToastIcon type={toast.type} />
												<p className="text-sm font-medium text-gray-800">
													{toast.message}
												</p>
											</div>
											{toast.description && (
												<p className="mt-1 text-xs text-gray-500">
													{toast.description}
												</p>
											)}
										</div>
									)}
									<button
										onClick={() => handleRemoveToast(toast.id)}
										className={`absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-600 rounded-full transition-opacity duration-200 ${
											hoveredId === toast.id ? "opacity-100" : "opacity-0"
										}`}
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							</div>
						))}
				</div>
			))}
		</>
	);
};

// Hook for using toasts
interface ToastOptions {
	description?: string;
	position?: ToastPosition;
	html?: string;
}

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}

	const toast = (
		message: string,
		type: ToastType = "default",
		options: ToastOptions = {}
	) => {
		const { description, position = "top-right", html } = options;
		context.addToast({
			message,
			type,
			position,
			description,
			html,
		});
	};

	return {
		toast,
		success: (message: string, options?: ToastOptions) =>
			toast(message, "success", options),
		error: (message: string, options?: ToastOptions) =>
			toast(message, "danger", options),
		info: (message: string, options?: ToastOptions) =>
			toast(message, "info", options),
		warning: (message: string, options?: ToastOptions) =>
			toast(message, "warning", options),
	};
};
