import React from "react";
import { BlogModel } from "@/models";
import Image from "next/image";
import { UserImage } from "@/lib/images";
import { Typography, Badge } from "@/components/ui";
import { formatDateMMDDAAAA } from "@/utilities";

export const Author = ({
	author,
	publishDate,
	tags,
	authorImage,
	authorImageAlt,
}: BlogModel) => {
	return (
		<section
			className="section-y-padding"
			aria-labelledby="author-section-heading"
		>
			<div className="flex items-center gap-5 mb-5">
				<Image
					src={authorImage ? authorImage : UserImage}
					height={125}
					width={125}
					alt={authorImageAlt || `Profile picture of ${author}`}
					className="rounded-full aspect-square object-cover object-center"
				/>

				<div>
					<Typography
						id="author-section-heading"
						className="font-bold"
						as="h3"
						variant="small"
						color="black"
					>
						{author}
					</Typography>

					<Typography as="span" variant="xsmall" color="darkGray">
						Published on{" "}
						<time dateTime={publishDate} className="font-medium">
							{formatDateMMDDAAAA(publishDate)}
						</time>
					</Typography>
				</div>
			</div>

			<div className="flex items-center gap-2 flex-wrap w-full">
				{tags && tags.length
					? tags.map((tag, index) => (
							<Badge
								color="green"
								isSelected={true}
								key={index}
								aria-label={`Tag: ${tag}`}
							>
								{tag}
							</Badge>
						))
					: ""}
			</div>
		</section>
	);
};
