import { getNewsPosts } from "@/actions/newsActions";
import BlogClient from "@/components/blog/BlogClient";

export default async function BlogPage() {
    const newsPosts = await getNewsPosts();
    return <BlogClient initialPosts={newsPosts} />;
}
