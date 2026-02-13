'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/components/cards/BlogCard'
import { Blog } from '@/types/cms'
import { staggerCards, cardItem } from '@/lib/motion-variants'

interface BlogProps {
    blogs: Blog[]
}

export function BlogSection({ blogs }: BlogProps) {
    return (
        <section id="blog" className="border-b border-border/40 bg-background py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Latest Blog Posts
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Thoughts, tutorials, and insights on web development
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerCards}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {blogs.map((blog) => (
                        <motion.div key={blog.id} variants={cardItem}>
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/blog">
                            View All Posts
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
