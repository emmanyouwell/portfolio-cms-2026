'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { Project } from '@/types/cms'
import { staggerCards, cardItem } from '@/lib/motion-variants'
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
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Button size="lg" variant="ghost" asChild className="group">
                            <Link href="/projects">
                                View Full Archive
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerCards}
                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={cardItem}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
