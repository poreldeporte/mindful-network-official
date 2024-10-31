"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Button, Typography } from "../ui";
import { ToastProvider, useToast } from "../ui/Toasts";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

function ContactForm() {
	const toast = useToast();

	const [userInput, setUserInput] = useState({
		to_email: "martin@poreldeporte.com",
		from_name: "",
		user_email: "",
		message: "",
		user_phone: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserInput({
			...userInput,
			[name]: value,
		});
	};

	const validateForm = () => {
		if (
			!userInput.from_name ||
			!userInput.user_email ||
			!userInput.user_phone ||
			!userInput.message
		) {
			toast.error("Error", {
				description: "All fields are required.",
				position: "top-right",
			});
			return false;
		}
		if (!/\S+@\S+\.\S+/.test(userInput.user_email)) {
			toast.error("Error", {
				description: "Invalid email address.",
				position: "top-right",
			});
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!validateForm()) {
			setIsSubmitting(false);
			return;
		}

		const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
		const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
		const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

		try {
			const res = await emailjs.send(
				serviceID,
				templateID,
				userInput,
				publicKey
			);

			if (res.status === 200) {
				toast.success("Success", {
					description: "Your message has been sent successfully!",
					position: "bottom-right",
				});

				setUserInput({
					...userInput,
					from_name: "",
					user_email: "",
					message: "",
					user_phone: "",
				});
			}
		} catch (error) {
			toast.error("Error", {
				description: "Failed to send message. Please try again later.",
				position: "bottom-right",
			});
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
			<input
				className="bg-transparent w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
				type="text"
				name="from_name"
				value={userInput.from_name}
				onChange={handleChange}
				placeholder="Full Name"
				required
			/>
			<input
				className="bg-transparent w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
				type="email"
				name="user_email"
				value={userInput.user_email}
				placeholder="Email"
				onChange={handleChange}
				required
			/>
			<input
				className="bg-transparent w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
				type="tel"
				name="user_phone"
				value={userInput.user_phone}
				placeholder="Phone"
				onChange={handleChange}
				required
			/>
			<textarea
				className="bg-transparent h-44 w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
				name="message"
				value={userInput.message}
				placeholder="Your message"
				onChange={handleChange}
				required
			/>
			<Button
				className="py-2 px-4 mt-10 rounded-full w-auto"
				variant="small"
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Sending..." : "Send Message"}
			</Button>
		</form>
	);
}

export function GetInTouch() {
	return (
		<section
			id="get-in-touch-form"
			className="page-width section-y-padding bg-orange-100"
		>
			<div className="rounded-xl grid grid-cols-1 lg:grid-cols-2">
				<div>
					<Typography color="black" as="h2" variant="xlarge">
						Get in Touch
					</Typography>
					<Typography
						className="mb-10"
						color="darkGray"
						as="h2"
						variant="medium"
					>
						We&apos;re Here to Help—Reach Out with Your Questions or Concerns
					</Typography>
				</div>
				<div className="flex flex-col items-end">
					<ToastProvider>
						<ContactForm />
					</ToastProvider>
				</div>
			</div>
		</section>
	);
}
