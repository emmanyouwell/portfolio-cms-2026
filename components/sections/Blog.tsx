import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/components/cards/BlogCard'
import { Blog } from '@/types/cms'

interface BlogProps {
    blogs: Blog[]
}

export function BlogSection({ blogs }: BlogProps) {

    return (
        <section id="blog" className="border-b border-border/40 bg-background py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Latest Blog Posts
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Thoughts, tutorials, and insights on web development
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div key={blog.id}>
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
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
