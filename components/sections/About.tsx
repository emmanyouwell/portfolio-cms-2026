'use client'


import { useInView } from '@/hooks/use-in-view'
import { SlopeDivider } from '@/components/ui/dividers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Code, Globe } from 'lucide-react'
import Image from 'next/image'

export function About() {
    const { ref: imageRef, hasInView: imageInView } = useInView({ threshold: 0.2 })
    const { ref: contentRef, hasInView: contentInView } = useInView({ threshold: 0.2 })

    return (
        <section id="about" className="relative py-24 overflow-hidden bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Visual/Image Side */}
                    <div
                        ref={imageRef}
                        className={`w-full lg:w-1/2 relative transition-all duration-1000 ${imageInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                            }`}
                    >
                        <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-muted/20 border border-white/5">
                            {/* Geometric Abstract Shapes */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-bl-[100px] blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-tr-[100px] blur-2xl" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image src="/images/professional/toga.jpg" alt="self portrait" fill className='object-cover' />
                            </div>

                            {/* Floating Tech Cards */}
                            <div
                                className="absolute top-12 left-8 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl transition-transform hover:scale-105 duration-300"
                            >
                                <Code className="w-6 h-6 text-primary" />
                            </div>
                            <div
                                className="absolute bottom-20 right-8 p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl transition-transform hover:scale-105 duration-300"
                            >
                                <Globe className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                    </div>

                    {/* Story Content */}
                    <div ref={contentRef} className="w-full lg:w-1/2 space-y-8">
                        <div
                            className={`transition-all duration-700 delay-100 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                More than just <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">lines of code.</span>
                            </h2>
                        </div>

                        <div
                            className={`space-y-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <p>
                                I started my journey with a simple curiosity: how do things work on the web? That curiosity
                                quickly evolved into a passion for building consistent, performant, and beautiful digital experiences.
                            </p>
                            <p>
                                Today, I blend technical expertise with a keen eye for design. I don&apos;t just write code;
                                I architect solutions that solve real problems while delighting users.
                            </p>
                        </div>

                        <div
                            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                        >
                            <Button asChild size="lg" className="rounded-full">
                                <Link href="#contact">
                                    Read My Story <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Divider */}
            <div className="absolute bottom-0 w-full translate-y-1">
                <SlopeDivider className="text-muted/10" fill="fill-current" />
            </div>
        </section>
    )
}
