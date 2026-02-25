

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Project } from '@/types/cms'
import { CurveDivider } from '@/components/ui/dividers'

interface ProjectsProps {
    projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
    return (
        <section id="projects" className="relative bg-background pt-32 pb-24 overflow-hidden">
            {/* Top Divider */}
            <div className="absolute top-0 w-full transform -translate-y-1">
                <CurveDivider className="text-background" fill="fill-muted/10" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4 text-primary font-medium">
                            <Sparkles className="w-5 h-5" />
                            <span>Selected Works</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            From Concept <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                To Working Product
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            A curated selection of projects where ideas were translated into functional, user-focused applications.
                        </p>
                    </div>

                    <div>
                        <Button size="lg" variant="ghost" asChild className="group">
                            <Link href="/projects">
                                View Full Archive
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project.id}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
