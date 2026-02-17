'use client'


import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Blog } from '@/types/cms'
import Image from 'next/image'

interface BlogCardProps {
    blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className="group h-full">
            <Link href={blog.link} className="block h-full">
                <div className="relative h-full transition-transform duration-300 group-hover:-translate-y-2">

                    {/* Stacked card effect */}
                    <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] rounded-2xl bg-primary/10 -z-10 transition-all duration-300 group-hover:right-[-12px] group-hover:bottom-[-12px] group-hover:bg-primary/20" />

                    <Card className="h-full overflow-hidden rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm transition-all shadow-lg hover:shadow-xl dark:bg-card/40">
                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                            {/* Blog Image Placeholder */}
                            <div
                                className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-secondary/30 to-muted transition-transform duration-500 group-hover:scale-105"
                            >
                                {blog.image.url ? (
                                    <Image src={blog.image.url} alt={blog.title} fill className="object-cover" loading="lazy" />
                                ) : (
                                    <p className="text-center text-sm text-muted-foreground/70">
                                        <span className="block mb-2 text-2xl opacity-20">✍️</span>
                                        Blog Cover
                                    </p>
                                )}

                            </div>

                            {/* Date Badge */}
                            {blog.publishedDate && (
                                <div className="absolute top-4 left-4">
                                    <div className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-border/50">
                                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <CardContent className="p-6 flex flex-col h-[calc(100%-aspect-[16/9])]">
                            {/* Tags */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold bg-secondary/50 hover:bg-secondary">
                                        {tag.value}
                                    </Badge>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                {blog.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-6 text-sm text-muted-foreground line-clamp-2 flex-grow">
                                {blog.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                                {blog.readTime && (
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{blog.readTime} min read</span>
                                    </div>
                                )}

                                <div className="flex items-center text-primary font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    {blog.isExternal ? (
                                        <>Go to link <ArrowRight className="ml-1 h-3.5 w-3.5" /></>
                                    ) : (<>Read Article <ArrowRight className="ml-1 h-3.5 w-3.5" /></>)}

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Link >
        </div >
    )
}
