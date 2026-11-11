import { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Blogs",
    description: "Updates, guides and notes from the LinkScribe team.",
}

export default function BlogLayout({ children } : { children : ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}