import type { Metadata } from "next";

export const metadata: Metadata = { title: "About YAAAS — African Creative Agency", description: "Meet YAAAS, an independent creative agency connecting contemporary African and diasporic artists, ideas and cultural experiences.", alternates: { canonical: "/about" } };

import { getNewsPosts } from "@/actions/newsActions";
import { getCollaborations } from "@/actions/collaborationActions";
import { getProjects } from "@/actions/projectActions";
import AboutClient from "@/components/about/AboutClient";

export default async function AboutPage() {
    const [newsPosts, collaborations, contents] = await Promise.all([
        getNewsPosts(),
        getCollaborations(),
        getProjects()
    ]);

    return <AboutClient newsPosts={newsPosts} collaborations={collaborations} contents={contents} />;
}
