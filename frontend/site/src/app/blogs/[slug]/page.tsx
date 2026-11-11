import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { blog } from "@/lib/source";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const page = blog.getPage([slug]);
    if (!page || page.data.draft) notFound();

    const Mdx = page.data.body;

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-16">
            <Link href="/blogs" className="text-sm text-fd-muted-foreground hover:text-fd-foreground">
                ← Back to blog
            </Link>

            <header className="mb-10 mt-6">
                <p className="text-sm text-fd-muted-foreground">
                    {new Date(page.data.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}{" "}
                    · {page.data.author}
                </p>
                <DocsTitle className="mt-2 text-4xl font-semibold tracking-tight">{page.data.title}</DocsTitle>
                {page.data.description && (
                    <DocsDescription className="mt-3 text-lg text-fd-muted-foreground">{page.data.description}</DocsDescription>
                )}
            </header>

            <DocsBody className="prose min-w-0">
                <InlineTOC items={page.data.toc} defaultOpen={true} />
                <Mdx components={defaultMdxComponents} />
            </DocsBody>
        </main>
    );
}

export function generateStaticParams() {
    return blog.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = blog.getPage([slug]);
    if (!page) return {};

    return {
        title: page.data.title,
        description: page.data.description,
    };
}