import { urlFor } from "@/api";
import { Typography } from "@/components/ui";
import { BlogModel } from "@/models";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

const components: PortableTextComponents = {
	types: {
		image: ({ value }) => {
			const imageUrl = value?.asset?._ref ? urlFor(value.asset).url() : null;

			if (!imageUrl) return "";

			return (
				<Image
					height={750}
					width={750}
					loading="lazy"
					src={imageUrl}
					alt={value.alt || "Image related to the blog content"}
					className="w-full md:w-3/4 mb-5"
				/>
			);
		},
	},
	block: {
		normal: ({ children }) => (
			<Typography className="mb-5" as="p" variant="small" color="black">
				{children}
			</Typography>
		),
		h2: ({ children }) => (
			<Typography className="mb-5" as="h2" variant="large" color="black">
				{children}
			</Typography>
		),
		h3: ({ children }) => (
			<Typography className="mb-5" as="h3" variant="medium" color="black">
				{children}
			</Typography>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="list-disc list-inside mb-10" role="list">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal list-inside mb-10" role="list">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => (
			<li className="mb-4 ml-4">
				<Typography variant="small" color="black">
					{children}
				</Typography>
			</li>
		),
		number: ({ children }) => (
			<li className="mb-4 ml-4">
				<Typography variant="small" color="black">
					{children}
				</Typography>
			</li>
		),
	},
	marks: {
		link: ({ value, children }) => {
			const target = value.href.startsWith("http") ? "_blank" : undefined;
			return (
				<a
					href={value.href}
					target={target}
					rel={target === "_blank" ? "noopener noreferrer" : undefined}
					className="text-blue-500 inline-flex underline hover:text-blue-700 items-center gap-1"
					aria-label={`Link to ${value.href}${target ? ", opens in a new tab" : ""}`}
				>
					{children}
				</a>
			);
		},
	},
};

export const Body = ({ content }: BlogModel) => {
	return (
		<section aria-label="Blog content" className="mt-10 lg:mt-24">
			<PortableText value={content} components={components} />
		</section>
	);
};
