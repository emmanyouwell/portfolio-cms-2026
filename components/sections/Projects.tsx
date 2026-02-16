'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Project } from '@/types/cms'
import { CurveDivider } from '@/components/ui/dividers'
import { useInView } from '@/hooks/use-in-view'

interface ProjectsProps {
    projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
    const { ref: headerRef, hasInView: headerInView } = useInView({ threshold: 0.1 })
    const { ref: gridRef, hasInView: gridInView } = useInView({ threshold: 0.1 })

    return (
        <section id="projects" className="relative bg-background pt-32 pb-24 overflow-hidden">
            {/* Top Divider */}
            <div className="absolute top-0 w-full transform -translate-y-1">
                <CurveDivider className="text-background" fill="fill-muted/10" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div
                        className={`max-w-2xl ${headerInView ? 'animate-fade-in-left' : 'opacity-0'}`}
                    >
                        <div className="flex items-center gap-2 mb-4 text-primary font-medium">
                            <Sparkles className="w-5 h-5" />
                            <span>Selected Works</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Building the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Digital Future
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            A curated selection of projects that push the boundaries of performance and design.
                        </p>
                    </div>

                    <div
                        className={headerInView ? 'animate-fade-in-right' : 'opacity-0'}
                    >
                        <Button size="lg" variant="ghost" asChild className="group">
                            <Link href="/projects">
                                View Full Archive
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Projects Grid */}
                <div
                    ref={gridRef}
                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project, index) => (
                        <ProjectCardWrapper key={project.id} project={project} index={index} parentInView={gridInView} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectCardWrapper({ project, index, parentInView }: { project: Project, index: number, parentInView: boolean }) {
    // Determine delay class based on index (modulo 3 for grid row stagger effect or just linear)
    // Using simple linear stagger for now as it's cleaner
    // delay-100, delay-200, delay-300...
    const delayMap = [
        '', 'delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'
    ];
    // Cap at delay-500 or wrap around if many items
    const delayClass = delayMap[index % delayMap.length] || '';

    return (
        <div className={parentInView ? `animate-fade-in-up ${delayClass}` : 'opacity-0'}>
            <ProjectCard project={project} />
        </div>
    )
}
