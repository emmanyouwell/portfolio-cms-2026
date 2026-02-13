'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import NextImage from 'next/image'
import { ArrowRight, Sparkles, Rocket, Code2, Award, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Stats } from '@/types/cms'
import { WaveDivider } from '@/components/ui/dividers'
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";


interface HeroProps {
    stats: Stats
}

export function Hero({ stats }: HeroProps) {
    const { scrollY } = useScroll()

    const y2 = useTransform(scrollY, [0, 500], [0, -150])

    return (
        <section className="relative min-h-[90vh] overflow-hidden bg-background flex flex-col justify-center">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen opacity-20" />
            </div>

            <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 pt-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Visual Scene (Right/Top on Mobile) */}
                    <div className="order-first lg:order-last w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
                        <motion.div
                            style={{ y: y2 }}
                            className="relative z-10 w-full max-w-sm aspect-square bg-gradient-to-tr from-primary/10 to-transparent rounded-full border border-primary/20 backdrop-blur-sm flex items-center justify-center"
                        >
                            {/* Central Emblem */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border border-dashed border-primary/30 rounded-full"
                            />
                            <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background/20 shadow-2xl">
                                <NextImage
                                    src="/images/professional/toga.jpg"
                                    alt="Emmanuel Mingala"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>


                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-4 p-4 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl z-20"
                            >
                                <Code2 className="w-8 h-8 text-accent" />
                            </motion.div>
                            {/* Project Launched */}
                            <motion.div
                                animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-8 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-20"
                            >
                                <div className="p-2 bg-emerald-500/10 rounded-full">
                                    <Rocket className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{stats.projects}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Projects Launched</div>
                                </div>
                            </motion.div>

                            {/* New Stats Cards */}
                            {/* Experience Card - Top Left */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
                                transition={{
                                    opacity: { duration: 0.5, delay: 0.8 },
                                    scale: { duration: 0.5, delay: 0.8 },
                                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }
                                }}
                                className="absolute -top-12 -left-4 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-10"
                            >
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Clock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{stats.experience}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Experience</div>
                                </div>
                            </motion.div>

                            {/* Certificates Card - Right Middle */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: [0, 10, 0] }}
                                transition={{
                                    opacity: { duration: 0.5, delay: 1 },
                                    x: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                className="absolute top-1/2 -right-16 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-30"
                            >
                                <div className="p-2 bg-accent/10 rounded-full">
                                    <Award className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{stats.certificates}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Certifications</div>
                                </div>
                            </motion.div>

                            {/* Blogs Card - Bottom Right */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: [0, 10, 0] }}
                                transition={{
                                    opacity: { duration: 0.5, delay: 1.2 },
                                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
                                }}
                                className="absolute -bottom-4 -right-8 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-10"
                            >
                                <div className="p-2 bg-purple-500/10 rounded-full">
                                    <BookOpen className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{stats.blogs}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Technical Blogs</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Content (Left/Bottom) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 space-y-8 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Available for new opportunities</span>
                        </motion.div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Hi, I&apos;m <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x bg-300%">
                                <TypewriterEffect
                                    words={["Emmanuel Mingala", "a Web Developer", "a Freelancer", "a Contributor"]}
                                />
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Transforming complex ideas into well-built web applications.
                            Focused on quality, growth, and continuous improvement.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow" asChild>
                                <Link href="#projects">
                                    View Mission Control
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="ghost" className="rounded-full px-8 h-12 text-base hover:bg-primary/5" asChild>
                                <Link href="#contact">Initiate Contact</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Transition */}
            <div className="absolute bottom-0 w-full transform translate-y-1">
                <WaveDivider className="text-background" fill="fill-muted/30" />
            </div>
        </section>
    )
}
