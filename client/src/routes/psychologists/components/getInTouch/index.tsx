"use client";

import { Button, Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import { useState } from "react";
import { ToastProvider, useToast } from "@/components/ui/Toasts";
import {
	IconMail,
	IconMessage,
	IconPhone,
	IconUser,
} from "@tabler/icons-react";
import emailjs from "@emailjs/browser";

emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

interface Props {
	psychologistName: string;
}

function ContactForm({ psychologistName }: Props) {
	const toast = useToast();

	const initialFormState = {
		to_email: "contact@themindfulnetwork.com",
		profesional_name: psychologistName,
		from_name: "",
		user_email: "",
		message: "",
		user_phone: "",
	};

	const [userInput, setUserInput] = useState(initialFormState);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserInput({
			...userInput,
			[name]: value,
		});
	};

	const resetForm = () => {
		setUserInput(initialFormState);
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

		const serviceID = process.env.EMAILJS_SERVICE_ID;
		const templateID = process.env.EMAILJS_TEMPLATE_ID;
		const userID = process.env.EMAILJS_PUBLIC_KEY;

		try {
			const res = await emailjs.send(serviceID, templateID, userInput, userID);

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

				resetForm();
			}
		} catch (error) {
			toast.error("Error", {
				description: "Failed to send message. Please try again later.",
				position: "top-right",
			});
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-full space-y-5"
			aria-label="Contact form"
		>
			<div className="relative">
				<label htmlFor="name" className="sr-only">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="from_name"
					placeholder="Name"
					value={userInput.from_name}
					className="rounded-full p-2 pl-10 w-full outline-0"
					aria-required="true"
					onChange={handleChange}
				/>
				<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
					<IconUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</div>
			<div className="relative">
				<label htmlFor="phone" className="sr-only">
					Phone Number
				</label>
				<input
					type="text"
					id="phone"
					name="user_phone"
					placeholder="Number"
					className="rounded-full p-2 pl-10 w-full outline-0"
					value={userInput.user_phone}
					onChange={handleChange}
					aria-required="true"
				/>
				<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
					<IconPhone className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</div>
			<div className="relative">
				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="user_email"
					placeholder="Email"
					className="rounded-full p-2 pl-10 w-full outline-0"
					value={userInput.user_email}
					onChange={handleChange}
					aria-required="true"
				/>
				<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
					<IconMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</div>
			<div className="relative">
				<label htmlFor="message" className="sr-only">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					placeholder="Message"
					className="rounded-xl p-2 pl-10 w-full resize-none outline-0"
					rows={4}
					value={userInput.message}
					onChange={handleChange}
					aria-required="true"
				></textarea>
				<span className="absolute left-3 top-3">
					<IconMessage className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</div>
			<div className="flex items-center justify-end">
				<Button
					className="py-2 px-4 mt-10 rounded-full w-auto"
					variant="small"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</Button>
			</div>
		</form>
	);
}

export function GetInTouch({ name }: PsychologistModel) {
	return (
		<section
			className="section-y-padding col-span-full lg:flex"
			id="get-in-touch"
			aria-labelledby="get-in-touch-heading"
		>
			<div className="mb-10 lg:w-1/2">
				<Typography
					className="font-dmSans"
					color="black"
					variant="title"
					as="h2"
					id="get-in-touch-heading"
				>
					Get in touch with <span className="block" />
					<span
						style={{ textTransform: "capitalize" }}
						className="text-green-500 font-antic"
					>
						{name.toLowerCase()}
					</span>
				</Typography>
			</div>

			<div className="bg-orange-100 rounded-2xl w-full lg:flex-grow p-5 lg:w-1/2 lg:p-10 flex flex-col items-center justify-center">
				<div className="flex flex-col gap-y-2 w-full">
					<ToastProvider>
						<ContactForm psychologistName={name} />
					</ToastProvider>
				</div>
			</div>
		</section>
	);
}
