import type { MetadataRoute } from "next";
import { getTalents } from "@/actions/talentActions";
import { getNewsPosts } from "@/actions/newsActions";
import { getProjects } from "@/actions/projectActions";

const siteUrl = "https://www.yaaas.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [talents, articles, projects] = await Promise.all([
    getTalents(),
    getNewsPosts(),
    getProjects(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/talents`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/catalogue`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/contents`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const talentPages: MetadataRoute.Sitemap = talents
    .filter((talent: any) => talent.slug)
    .map((talent: any) => ({
      url: `${siteUrl}/talents/${talent.slug}`,
      lastModified: talent.updatedAt ? new Date(talent.updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${siteUrl}/news/${article._id}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${siteUrl}/contents/${project._id}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...talentPages, ...articlePages, ...projectPages];
}
