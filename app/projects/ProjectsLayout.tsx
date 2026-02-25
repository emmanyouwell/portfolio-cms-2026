"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, LayoutTemplate } from "lucide-react"

import { Project } from "@/types/cms"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProjectsLayoutProps {
    initialProjects: Project[]
}

export function ProjectsLayout({ initialProjects }: ProjectsLayoutProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(initialProjects[0] || null)
    const [visibleCount, setVisibleCount] = useState(5)
    const [isMobile, setIsMobile] = useState(false)

    const renderRichText = (blocks: Project['longDescription']) => {
        if (!blocks || !Array.isArray(blocks)) return null;
        return blocks.map((block, i) => {
            if (block.type === 'paragraph') {
                return (
                    <p key={i} className="mb-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                        {block.children.map((child: { text: string }, j: number) => (
                            <span key={j}>{child.text}</span>
                        ))}
                    </p>
                );
            }
            return null;
        });
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const displayedProjects = isMobile ? initialProjects.slice(0, visibleCount) : initialProjects

    useEffect(() => {
        console.log(selectedProject)
    }, [selectedProject])

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 5)
    }

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-[calc(100vh-12rem)] lg:min-h-[600px]">
            {/* Left Panel: Project List */}
            <Card className="order-2 lg:order-none lg:col-span-3 flex flex-col h-auto lg:h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-md">
                <CardHeader className="py-4 px-6 border-b">
                    <CardTitle className="text-lg">Projects</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {displayedProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => {
                                setSelectedProject(project)
                                if (isMobile) {
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }
                            }}
                            className={cn(
                                "cursor-pointer rounded-xl p-4 transition-all duration-200 border",
                                selectedProject?.id === project.id
                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                    : "bg-background hover:bg-muted border-transparent hover:border-border"
                            )}
                        >
                            <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{project.shortDescription}</p>
                        </div>
                    ))}
                    {isMobile && visibleCount < initialProjects.length && (
                        <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={handleLoadMore}
                        >
                            View more ({initialProjects.length - visibleCount})
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Middle Panel: Project Details */}
            <Card className="order-1 lg:order-none lg:col-span-6 flex flex-col h-auto lg:h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-md">
                {selectedProject ? (
                    <CardContent className="flex-1 overflow-y-auto p-0 custom-scrollbar flex flex-col">
                        <div className="relative w-full aspect-video bg-muted/30">
                            {selectedProject.image?.url ? (
                                <Image
                                    src={selectedProject.image.url}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                    No image available
                                </div>
                            )}
                        </div>
                        <div className="p-6 lg:p-8 flex-1">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <Badge variant="secondary">{selectedProject.category}</Badge>
                                        {selectedProject.metadata?.year && (
                                            <Badge variant="outline" className="text-muted-foreground">
                                                {selectedProject.metadata.year}
                                            </Badge>
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h2>
                                </div>
                                <div className="flex gap-2">
                                    {selectedProject.link?.github && (
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={selectedProject.link.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    )}
                                    {selectedProject.link?.demo && (
                                        <Button size="icon" asChild>
                                            <Link href={selectedProject.link.demo} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-border/50">
                                {selectedProject?.techStack?.map((tech, i) => (
                                    <Badge key={i} variant="outline" className="bg-primary/5 border-primary/20">
                                        {tech.value}
                                    </Badge>
                                ))}
                            </div>

                            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                {selectedProject.longDescription && selectedProject.longDescription.length > 0 ? (
                                    renderRichText(selectedProject.longDescription)
                                ) : selectedProject.detailedDescription && selectedProject.detailedDescription.length > 0 ? (
                                    selectedProject.detailedDescription.map((item, index) => (
                                        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                                            {item.value}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {selectedProject.shortDescription}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                        <LayoutTemplate className="w-12 h-12 mb-4 opacity-20" />
                        <p>Select a project from the left panel to view details.</p>
                    </div>
                )}
            </Card>

            {/* Right Panel: Placeholder */}
            <Card className="order-3 lg:order-none lg:col-span-3 flex flex-col h-auto lg:h-full border-dashed border-2 bg-transparent">
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground opacity-50">
                    <LayoutTemplate className="w-10 h-10 mb-4" />
                    <p className="font-medium text-sm">Empty Placeholder Component</p>
                    <p className="text-xs mt-2">Reserved for future features or additional context.</p>
                </div>
            </Card>
        </div>
    )
}
