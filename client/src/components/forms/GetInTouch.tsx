import { Typography } from "../ui";
import { Button } from "../ui";

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
					<form className="w-full flex flex-col gap-5">
						<input
							className="bg-transparent w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
							type="text"
							placeholder="Full Name"
						></input>
						<input
							className="bg-transparent w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
							type="text"
							placeholder="Email"
						></input>
						<input
							className="bg-transparent w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
							type="text"
							placeholder="Phone"
						></input>
						<textarea
							className="bg-transparent h-44 w-auto p-2 border-b border-gray-400 placeholder-gray-400 appearance-none outline-none"
							placeholder="Your message"
						></textarea>
					</form>
					<Button
						className="py-2 px-4 mt-10 rounded-full w-auto"
						variant="small"
					>
						Send Message
					</Button>
				</div>
			</div>
		</section>
	);
}
