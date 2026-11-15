import type { Metadata } from "next";
import { getProjects } from "@/actions/projectActions";
import { getNewsPosts } from "@/actions/newsActions";
import ContentsClient from "@/components/contents/ContentsClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "African Art, Culture, Projects & Stories | YAAAS",
    description: "Explore YAAAS creative projects, African art exhibitions, artist collaborations, cultural experiences, news and stories from across Africa and its diaspora.",
    alternates: { canonical: "/contents" },
    openGraph: {
        title: "The YAAAS Journal | African Art, Culture & Creative Projects",
        description: "Case studies, exhibitions, artist stories, cultural projects and perspectives from across Africa and its diaspora.",
        type: "website",
    },
};

export default async function ContentsPage() {
    const [projects, newsPosts] = await Promise.all([getProjects(), getNewsPosts()]);
    return <ContentsClient initialContents={projects} newsPosts={newsPosts} />;
}
