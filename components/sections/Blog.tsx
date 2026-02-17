'use client'


import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/components/cards/BlogCard'
import { Blog } from '@/types/cms'
import { useInView } from '@/hooks/use-in-view'

interface BlogProps {
    blogs: Blog[]
}

export function BlogSection({ blogs }: BlogProps) {
    const { ref: headerRef, hasInView: headerInView } = useInView({ threshold: 0.2 })
    const { ref: gridRef, hasInView: gridInView } = useInView({ threshold: 0.1 })
    const { ref: buttonRef, hasInView: buttonInView } = useInView({ threshold: 0.2 })

    return (
        <section id="blog" className="border-b border-border/40 bg-background py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`mb-12 text-center transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Latest Blog Posts
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Thoughts, tutorials, and insights on web development
                    </p>
                </div>

                {/* Blog Grid */}
                <div
                    ref={gridRef}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {blogs.map((blog, index) => (
                        <div
                            key={blog.id}
                            className={`transition-all duration-700 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div
                    ref={buttonRef}
                    className={`mt-12 text-center transition-all duration-700 delay-300 ${buttonInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/blog">
                            View All Posts
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
