import { Button, Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import {
	IconMail,
	IconMessage,
	IconPhone,
	IconUser,
} from "@tabler/icons-react";

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
					<form
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
								name="name"
								placeholder="Name"
								className="rounded-full p-2 pl-10 w-full outline-0"
								aria-required="true"
							/>
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<IconUser
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</div>
						<div className="relative">
							<label htmlFor="phone" className="sr-only">
								Phone Number
							</label>
							<input
								type="text"
								id="phone"
								name="phone"
								placeholder="Number"
								className="rounded-full p-2 pl-10 w-full outline-0"
								aria-required="true"
							/>
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<IconPhone
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</div>
						<div className="relative">
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								className="rounded-full p-2 pl-10 w-full outline-0"
								aria-required="true"
							/>
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<IconMail
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
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
								aria-required="true"
							></textarea>
							<span className="absolute left-3 top-3">
								<IconMessage
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</div>
					</form>
					<div className="flex items-center justify-end">
						<Button
							variant="medium"
							form="primary"
							className="p-2 rounded-full mt-5 lg:w-1/4"
							aria-label="Send message"
						>
							<Typography color="white" variant="small" as="h3">
								Send Message
							</Typography>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
