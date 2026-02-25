import { fetchAPI } from "@/lib/fetch-api";
import { ProjectsLayout } from "./ProjectsLayout";

export const metadata = {
    title: "Projects | My Portfolio",
    description: "A curated selection of projects from concept to working product.",
};

export default async function ProjectsPage() {
    const baseQuery = {
        params: {
            populate: '*',
            sort: ['dateCreated:desc'],
        },
    };

    const projectsRes = await fetchAPI('/projects', baseQuery);
    const projects = projectsRes?.data || [];

    return (
        <main className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Projects</h1>
                    <p className="text-muted-foreground mt-2">Explore my personal and professional works.</p>
                </div>
                <ProjectsLayout initialProjects={projects} />
            </div>
        </main>
    );
}
