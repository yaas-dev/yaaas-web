import type { Metadata } from "next";

export const metadata: Metadata = { title: "African Art Stories & Journal", description: "Read stories, artist features, exhibition highlights and perspectives on contemporary African art and culture from YAAAS.", alternates: { canonical: "/blog" } };

import { getNewsPosts } from "@/actions/newsActions";
import BlogClient from "@/components/blog/BlogClient";

export default async function BlogPage() {
    const newsPosts = await getNewsPosts();
    return <BlogClient initialPosts={newsPosts} />;
}
