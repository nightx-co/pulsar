import { notFound } from "next/navigation";
//import { isAdmin } from "@/lib/blog/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // 404 instead of 403 so the admin area isn't discoverable
    //if (!(await isAdmin())) notFound();

    return <div className="mx-auto w-full max-w-4xl px-4 py-10">{children}</div>;
}