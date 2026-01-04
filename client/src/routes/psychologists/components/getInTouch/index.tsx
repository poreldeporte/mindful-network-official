"use client";

import { Button, Typography } from "@/components/ui";
import { ToastProvider, useToast } from "@/components/ui/Toasts";
import { PsychologistModel } from "@/models";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

interface Props {
	psychologistName: string;
}

function ContactForm({ psychologistName }: Props) {
	const toast = useToast();

	useEffect(() => {
		emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
	}, []);

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
				position: "bottom-right",
			});
			return false;
		}
		if (!/\S+@\S+\.\S+/.test(userInput.user_email)) {
			toast.error("Error", {
				description: "Invalid email address.",
				position: "bottom-right",
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

		try {
			const res = await emailjs.send(serviceID, templateID, userInput);

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
			className="w-full flex flex-col gap-5"
			aria-label="Contact form"
		>
			<div>
				<label htmlFor="name" className="sr-only">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="from_name"
					placeholder="Name"
					value={userInput.from_name}
					className="bg-transparent w-full p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
					aria-required="true"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="phone" className="sr-only">
					Phone Number
				</label>
				<input
					type="text"
					id="phone"
					name="user_phone"
					placeholder="Number"
					className="bg-transparent w-full p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
					value={userInput.user_phone}
					onChange={handleChange}
					aria-required="true"
				/>
			</div>
			<div>
				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="user_email"
					placeholder="Email"
					className="bg-transparent w-full p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
					value={userInput.user_email}
					onChange={handleChange}
					aria-required="true"
				/>
			</div>
			<div>
				<label htmlFor="message" className="sr-only">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					placeholder="Message"
					className="bg-transparent h-44 w-full p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
					rows={4}
					value={userInput.message}
					onChange={handleChange}
					aria-required="true"
				></textarea>
			</div>
			<div className="flex items-center justify-start">
				<Button
					className="py-2 px-4 mt-10 rounded-full w-auto"
					variant="bodySmall"
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
			className="section-y-padding col-span-full pb-6 lg:pb-8"
			id="get-in-touch"
			aria-labelledby="get-in-touch-heading"
		>
			<div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
				<div>
					<Typography
						color="black"
						as="h2"
						variant="h2"
						className="font-antic mb-5"
						id="get-in-touch-heading"
					>
						Get in touch with <span className="block" />
						<span
							style={{ textTransform: "capitalize" }}
							className="text-blue-500 font-antic"
						>
							{name.toLowerCase()}
						</span>
					</Typography>
					<Typography className="mb-10" color="darkGray" as="p" variant="body">
						We&apos;re Here to Help—Reach Out with Your Questions or Concerns
					</Typography>
				</div>

				<div className="flex flex-col items-end">
					<ToastProvider>
						<ContactForm psychologistName={name} />
					</ToastProvider>
				</div>
			</div>
		</section>
	);
}
