import React from "react";
import { BlogModel } from "@/models";
import { Typography } from "@/components/ui";
import { ExternalLink } from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
	types: {
		image: ({ value }) => (
			<img
				src={value.asset._ref}
				alt={value.alt || "Blog Image"}
				style={{ maxWidth: "100%", height: "auto" }}
			/>
		),
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
			<ul className="list-disc list-inside mb-10">{children}</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal list-inside mb-10">{children}</ol>
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
				>
					{children}
					<ExternalLink className="h-5 w-5" />
				</a>
			);
		},
	},
};

export const Body = ({ content }: BlogModel) => {
	return (
		<section className="page-width">
			<PortableText value={content} components={components} />
		</section>
	);
};
