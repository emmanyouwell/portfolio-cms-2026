'use client'


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
                <div
                    className="absolute inset-4 border border-dashed border-primary/30 rounded-full animate-spin-slow"
                />
            )}

            {/* Floating Elements & Stats Cards Container */}
            <div className="grid grid-cols-2 gap-4 w-full lg:contents">

                {/* Code Icon - Floating Element */}
                <div className="relative lg:absolute lg:-top-10 lg:-right-4 z-20 hidden lg:block">
                    <div className="p-4 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl">
                        <Code2 className="w-8 h-8 text-primary/50" />
                    </div>
                </div>

                {/* Project Launched */}
                <div className="relative lg:absolute lg:-bottom-8 lg:-left-8 z-20 h-full lg:h-auto">
                    <div className="p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 h-full lg:h-auto">
                        <div className="p-2 bg-emerald-500/10 rounded-full shrink-0">
                            <Rocket className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <div className="text-lg font-bold">{stats.projects}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Projects Launched</div>
                        </div>
                    </div>
                </div>

                {/* Experience Card - Top Left */}
                <div className="relative lg:absolute lg:-top-12 lg:-left-4 z-10 h-full lg:h-auto">
                    <div className="p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 h-full lg:h-auto">
                        <div className="p-2 bg-purple-500/10 rounded-full shrink-0">
                            <Clock className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <div className="text-lg font-bold">{stats.experience}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Experience</div>
                        </div>
                    </div>
                </div>

                {/* Certificates Card - Right Middle */}
                <div className="relative lg:absolute lg:top-1/2 lg:-right-16 z-30 h-full lg:h-auto">
                    <div className="p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 h-full lg:h-auto">
                        <div className="p-2 bg-primary/10 rounded-full shrink-0">
                            <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-lg font-bold">{stats.certificates}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Certifications</div>
                        </div>
                    </div>
                </div>

                {/* Blogs Card - Bottom Right */}
                <div className="relative lg:absolute lg:-bottom-4 lg:-right-8 z-10 h-full lg:h-auto">
                    <div className="p-3 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center gap-3 h-full lg:h-auto">
                        <div className="p-2 bg-purple-500/10 rounded-full shrink-0">
                            <BookOpen className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <div className="text-lg font-bold">{stats.blogs}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Technical Blogs</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
