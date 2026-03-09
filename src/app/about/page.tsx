import { getNewsPosts } from "@/actions/newsActions";
import { getCollaborations } from "@/actions/collaborationActions";
import { getProjects } from "@/actions/projectActions";
import AboutClient from "@/components/about/AboutClient";

export default async function AboutPage() {
    const [newsPosts, collaborations, projects] = await Promise.all([
        getNewsPosts(),
        getCollaborations(),
        getProjects()
    ]);

    return <AboutClient newsPosts={newsPosts} collaborations={collaborations} projects={projects} />;
}
