import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QbTranslationPage } from "@/components/projects/qb-translation-page";
import { StandardProjectPage } from "@/components/projects/standard-project-page";
import { getProjectBySlug, projects } from "@/content/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.metaDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "qb-translation") {
    return <QbTranslationPage project={project} />;
  }

  return <StandardProjectPage project={project} />;
}
