import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { playlist_by_slug_query, startup_by_id_query } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from 'markdown-it';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { View } from "@/components/View";
import sanitizeHtml from "sanitize-html";
import { StartUpCard, StartUpTypeCard } from "@/components/StartUpCard";

// page.js o component.js
export const experimental_ppr = true;

const md = markdownit();

export default async function StartUpPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const [postArray, playlistArray] = await Promise.all([
		client.fetch(startup_by_id_query, { id }),
		client.fetch(playlist_by_slug_query, { slug: "editor-picks-new" }),
	]);	

	const post = postArray[0];

	const {select:editorPost}= playlistArray;

	if (!post) notFound();

	const parsedContent = sanitizeHtml(md.render(post?.pitch ?? ""));

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formatDate(post?._createdAt)}</p>
				<h1 className="heading">{post.title}</h1>
				<p className="sub-heading !max-w-5xl">{post?.description}</p>
			</section>

			<section className="section_container">
				<Image
					src={post?.image}
					width={300}
					height={300}
					alt="thumbnail"
					className="w-full h-auto rounded-xl"
				/>

				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
							<Image
								src={post.author?.image ?? "https://placehold.co/64x64"}
								alt="avatar"
								width={64}
								height={64}
								className="rounded-full drop-shadow-lg"
							/>

							<div>
								<p className="text-20-medium">{post.author.name}</p>
								<p className="text-16-medium !text-black-300">@{post.author.username}</p>
							</div>
						</Link>

						<p className="category-tag">{post?.category}</p>

					</div>

					<h3 className="text-30-bold">Detalles de la Propuesta</h3>
					{parsedContent ? (
						<article
							className="prose max-w-4xl font-work-sans break-all"
							dangerouslySetInnerHTML={{ __html: parsedContent }} />
					) : (
						<p className="no-result text-16-medium">No hay contenido para mostrar</p>
					)}
				</div>
				<hr className="divider" />


					{editorPost?.length>0 &&(
						<div className="max-w-4xl mx-auto">
							<p className="text-30-semibold">Editor Picks</p>
							<ul className="mt-7 card_grid-sm">
								{editorPost.map((post:StartUpTypeCard, index: number) => (
									<StartUpCard key={index} post={post} />
								))}
							</ul>

						</div>
					)
						
					}

					<Suspense fallback={<Skeleton className="view_skeleton" />}> 
						<View id={id} />
					</Suspense>
			</section>

			

		</>
	);
}