import { getNewsPosts } from "@/actions/newsActions";
import { getCollaborations } from "@/actions/collaborationActions";
import AboutClient from "@/components/about/AboutClient";

export default async function AboutPage() {
    const [newsPosts, collaborations] = await Promise.all([
        getNewsPosts(),
        getCollaborations()
    ]);

    return <AboutClient newsPosts={newsPosts} collaborations={collaborations} />;
}
