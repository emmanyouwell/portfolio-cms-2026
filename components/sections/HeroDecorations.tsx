'use client'

import { motion } from 'framer-motion'
import { Rocket, Code2, Award, BookOpen, Clock } from 'lucide-react'
import { Stats } from '@/types/cms'
import { useMediaQuery } from '@/hooks/use-media-query'

interface HeroDecorationsProps {
    stats: Stats
}

export default function HeroDecorations({ stats }: HeroDecorationsProps) {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <>
            {/* Desktop Rotating Emblem (Hidden on Mobile) */}
            {!isMobile && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-dashed border-primary/30 rounded-full"
                />
            )}

            {/* Floating Elements & Stats Cards Container */}
            <div className="grid grid-cols-2 gap-4 w-full lg:contents">

                {/* Code Icon - Floating Element */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -15, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.2 },
                        y: { duration: 0.5, delay: 0.2 }, // Entry transition
                        default: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 } // Float transition
                    }}
                    className="relative lg:absolute lg:-top-10 lg:-right-4 p-4 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl z-20 hidden lg:block"
                >
                    <Code2 className="w-8 h-8 text-accent" />
                </motion.div>

                {/* Project Launched */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -15, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.4 },
                        y: { duration: 0.5, delay: 0.4 },
                        default: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                    className="relative lg:absolute lg:-bottom-8 lg:-left-8 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-20 h-full lg:h-auto"
                >
                    <div className="p-2 bg-emerald-500/10 rounded-full shrink-0">
                        <Rocket className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-lg font-bold">{stats.projects}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Projects Launched</div>
                    </div>
                </motion.div>

                {/* Experience Card - Top Left */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -15, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.6 },
                        y: { duration: 0.5, delay: 0.6 },
                        default: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                    className="relative lg:absolute lg:-top-12 lg:-left-4 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-10 h-full lg:h-auto"
                >
                    <div className="p-2 bg-purple-500/10 rounded-full shrink-0">
                        <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <div className="text-lg font-bold">{stats.experience}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Experience</div>
                    </div>
                </motion.div>

                {/* Certificates Card - Right Middle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -15, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.8 },
                        y: { duration: 0.5, delay: 0.8 },
                        default: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                    }}
                    className="relative lg:absolute lg:top-1/2 lg:-right-16 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-30 h-full lg:h-auto"
                >
                    <div className="p-2 bg-primary/10 rounded-full shrink-0">
                        <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <div className="text-lg font-bold">{stats.certificates}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Certifications</div>
                    </div>
                </motion.div>

                {/* Blogs Card - Bottom Right */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -15, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 1.0 },
                        y: { duration: 0.5, delay: 1.0 },
                        default: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }
                    }}
                    className="relative lg:absolute lg:-bottom-4 lg:-right-8 p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 z-10 h-full lg:h-auto"
                >
                    <div className="p-2 bg-purple-500/10 rounded-full shrink-0">
                        <BookOpen className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <div className="text-lg font-bold">{stats.blogs}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Technical Blogs</div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
