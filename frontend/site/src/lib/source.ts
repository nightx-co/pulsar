import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsRoute } from './shared';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineDocs } from 'fumadocs-mdx/macro';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { z } from "zod";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const docs = defineDocs({
    dir: 'content/docs',
    docs: {
        schema: pageSchema,
        postprocess: {
            includeProcessedMarkdown: true,
        },
        mdxOptions: applyMdxPreset({
      remarkPlugins: (v) => [remarkMath, ...v],
      rehypePlugins: (v) => [rehypeKatex, ...v],
    }),
    },
    meta: {
        schema: metaSchema,
    },
});

export const blogs = defineCollections({
    type: "doc",
    dir: "content/blogs",
    postprocess: {
        includeProcessedMarkdown: true,
        extractLinkReferences : true
    },
    schema: pageSchema.extend({
        author: z.string().default("LinkScribe Team"),
        date: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
    }),
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
    baseUrl: docsRoute,
    source: docs.toFumadocsSource(),
    plugins: [lucideIconsPlugin()],
});

export const blog = loader({
    baseUrl: "/blogs",
    source: blogs.toFumadocsSource(),
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})
  ${await page.data.getText('processed')}`,
});
