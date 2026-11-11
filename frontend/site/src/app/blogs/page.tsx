import Link from "next/link";
import type { Route } from "next";
import type { Metadata } from "next";
import { blog } from "@/lib/source";

export default function BlogIndexPage() {
    const posts = blog
        .getPages()
        .filter((p) => !p.data.draft)
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

    return (
        <main className="mx-auto w-full max-w-3xl px-4 space-y-9 py-16">
            <Link href="/" className="text-sm text-fd-muted-foreground hover:text-fd-foreground">
                ← Home
            </Link>

            <h1 className="mb-10 text-4xl font-semibold tracking-tight">Blogs</h1>

            {posts.length === 0 ? (
                <p className="text-fd-muted-foreground">Nothing published yet.</p>
            ) : (
                <div className="divide-y divide-fd-border">
                    {posts.map((post) => (
                        <article key={post.url} className="py-6 first:pt-0 last:pb-0">
                            <Link href={post.url as Route} className="group block">
                                <p className="text-xs font-medium text-fd-muted-foreground">
                                    {new Date(post.data.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}{" "}
                                    · {post.data.author}
                                </p>
                                <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-fd-foreground group-hover:underline">
                                    {post.data.title}
                                </h2>
                                {post.data.description && (
                                    <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">
                                        {post.data.description}
                                    </p>
                                )}
                                {post.data.tags.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {post.data.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded bg-fd-muted px-2 py-0.5 text-xs text-fd-muted-foreground"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}