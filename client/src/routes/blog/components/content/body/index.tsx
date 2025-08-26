import { urlFor } from "@/api";
import { Typography } from "@/components/ui";
import { BlogModel } from "@/models";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { generateHeadingId } from "@/utilities/toc.utility";

const extractTextFromChildren = (children: any): string => {
	if (!children || !Array.isArray(children)) return "";

	const firstChild = children[0];
	if (firstChild?.props?.text) {
		return firstChild.props.text;
	}

	if (firstChild?.children) {
		return extractTextFromChildren(firstChild.children);
	}

	if (firstChild?.props?.children) {
		return extractTextFromChildren(firstChild.props.children);
	}

	return "";
};

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
			<Typography className="mb-5" as="p" variant="bodySmall" color="black">
				{children}
			</Typography>
		),
		h1: ({ children }) => {
			const text = extractTextFromChildren(children);
			const id = generateHeadingId(text);

			return (
				<Typography
					id={id}
					className="mb-5 scroll-mt-20"
					as="h1"
					variant="h1"
					color="black"
				>
					{children}
				</Typography>
			);
		},
		h2: ({ children }) => {
			const text = extractTextFromChildren(children);
			const id = generateHeadingId(text);

			return (
				<Typography
					id={id}
					className="mb-5 scroll-mt-20"
					as="h2"
					variant="h2"
					color="black"
				>
					{children}
				</Typography>
			);
		},
		h3: ({ children }) => {
			const text = extractTextFromChildren(children);
			const id = generateHeadingId(text);

			return (
				<Typography
					id={id}
					className="mb-5 scroll-mt-20 underline underline-offset-4 font-light"
					as="h3"
					variant="body"
					color="blue"
				>
					{children}
				</Typography>
			);
		},
		h4: ({ children }) => {
			const text = extractTextFromChildren(children);
			const id = generateHeadingId(text);

			return (
				<Typography
					id={id}
					className="mb-5 scroll-mt-20"
					as="h4"
					variant="bodySmall"
					color="black"
				>
					{children}
				</Typography>
			);
		},
		h5: ({ children }) => {
			const text = extractTextFromChildren(children);
			const id = generateHeadingId(text);

			return (
				<Typography
					id={id}
					className="mb-5 scroll-mt-20"
					as="h5"
					variant="bodySmall"
					color="black"
				>
					{children}
				</Typography>
			);
		},
		h6: ({ children }) => {
			const text = extractTextFromChildren(children);
			const id = generateHeadingId(text);

			return (
				<Typography
					id={id}
					className="mb-5 scroll-mt-20"
					as="h6"
					variant="bodySmall"
					color="black"
				>
					{children}
				</Typography>
			);
		},
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
				<Typography variant="bodySmall" color="black">
					{children}
				</Typography>
			</li>
		),
		number: ({ children }) => (
			<li className="mb-4 ml-4">
				<Typography variant="bodySmall" color="black">
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
