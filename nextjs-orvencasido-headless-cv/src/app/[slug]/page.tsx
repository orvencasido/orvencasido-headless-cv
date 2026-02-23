// export default function DummyPage() {
//     return <p>Slug page temporarily disabled.</p>
// }

import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const RESUME_QUERY = `coalesce(
    *[_type == "post" && slug.current == $slug][0],
    *[_type == "resume"] { "project": projects[slug.current == $slug][0] }[0].project
)`;

type SanityImageSource = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
};

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? createImageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function ResumePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const project = await client.fetch<SanityDocument>(RESUME_QUERY, await params, options);

    if (!project) {
        return (
            <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
                <Link href="/" className="hover:underline">
                    ← Back home
                </Link>
                <h1 className="text-4xl font-bold mb-8">Not Found</h1>
                <p>The post or project you are looking for does not exist.</p>
            </main>
        );
    }

    const projectImageUrl = project.image
        ? urlFor(project.image)?.width(550).height(310).url()
        : null;

    const content = project.body || project.content;

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4 animate-in">
            <Link href="/" className="hover:underline">
                ← Back
            </Link>
            {projectImageUrl && (
                <img
                    src={projectImageUrl}
                    alt={project.title}
                    className="aspect-video rounded-xl object-cover"
                    width="550"
                    height="310"
                />
            )}
            <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
            <div className="prose prose-neutral dark:prose-invert">
                {project.publishedAt && (
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                        Published: {new Date(project.publishedAt).toLocaleDateString()}
                    </p>
                )}
                {Array.isArray(content) ? (
                    <PortableText value={content} />
                ) : (
                    <p className="text-muted-foreground">{project.description}</p>
                )}
            </div>
        </main>
    );
}