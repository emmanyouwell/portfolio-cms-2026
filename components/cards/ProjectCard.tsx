'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/types/cms'
import { cardHover } from '@/lib/motion-variants'
import Image from 'next/image'

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="group h-full"
        >
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-card/60 border border-white/10 backdrop-blur-md shadow-xl transition-all hover:shadow-2xl hover:bg-card/80">
                {/* Decorative blob behind content */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-75" />

                <div className="relative aspect-video overflow-hidden m-2 rounded-[1.5rem]">
                    {/* Project Image Placeholder */}
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                        {project.image.url ? (
                            <Image src={project.image.url} alt={project.title} fill className="object-cover" loading="lazy" />
                        ) : (
                            <p className="text-center text-sm text-muted-foreground/80 font-medium">
                                Project Preview
                                <br />
                                <span className="text-xs opacity-70">{project.title}</span>
                            </p>
                        )}

                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-4">
                        {project.link?.github && (
                            <Link
                                href={project.link.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg hover:scale-110 transition-transform">
                                    <Github className="h-5 w-5" />
                                </div>
                            </Link>
                        )}
                        {project.link?.demo && (
                            <Link
                                href={project.link.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform">
                                    <ExternalLink className="h-5 w-5" />
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Category Floating Badge */}
                    <div className="absolute right-3 top-3">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm border-0 font-medium">
                            {project.category}
                        </Badge>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        {project.link?.demo && (
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        )}
                    </div>

                    <p className="mb-6 text-sm text-muted-foreground/90 line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project?.techStack?.map((tech, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
                            >
                                {tech.value}
                            </Badge>
                        ))}
                    </div>

                    {/* Footer Metadata */}
                    {project.metadata && (
                        <div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-between text-xs font-medium text-muted-foreground">
                            {project.metadata.role && <span>{project.metadata.role}</span>}
                            {project.metadata.year && <span className="opacity-70">{project.metadata.year}</span>}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
