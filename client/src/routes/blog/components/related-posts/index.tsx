import Link from "next/link";
import type { RelatedBlogSummary } from "@/routes/homepage/services";

/**
 * "Related reading" links at the bottom of a blog post (same category, newest 3).
 * Real server-rendered anchors so they count as internal links — blog posts were
 * otherwise cross-link orphans, which holds them back in search. Renders nothing
 * when there are no related posts.
 */
export function RelatedPosts({ posts }: { posts: RelatedBlogSummary[] }) {
	if (!posts || posts.length === 0) return null;

	return (
		<section
			className="section-y-padding mx-auto w-10/12"
			aria-labelledby="related-posts-heading"
		>
			<h2
				id="related-posts-heading"
				className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl"
			>
				Related reading
			</h2>
			<ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<li key={post.slug}>
						<Link
							href={`/blog/${post.slug}`}
							className="group block h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
						>
							<h3 className="font-medium text-slate-900 group-hover:text-emerald-700">
								{post.title}
							</h3>
							{post.excerpt && (
								<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
									{post.excerpt}
								</p>
							)}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
