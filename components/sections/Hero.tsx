'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Stats } from '@/types/cms'
import { WaveDivider } from '@/components/ui/dividers'
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { trackEvent } from '@/lib/gtag'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const HeroDecorations = dynamic(() => import('./HeroDecorations'), { ssr: false })
const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false })

interface HeroProps {
    stats: Stats
}

export function Hero({ stats }: HeroProps) {

    return (
        <section className="relative min-h-[90vh] overflow-hidden bg-background flex flex-col justify-center py-8">
            {/* Background Atmosphere */}
            <HeroBackground />

            <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8 pt-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Visual Scene (Right/Top on Mobile) */}
                    <div className="order-last w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
                        <div
                            className="relative z-10 w-full max-w-sm lg:aspect-square bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl lg:rounded-full border border-primary/20 backdrop-blur-sm flex flex-col lg:items-center lg:justify-center p-6 lg:p-0 gap-8 lg:gap-0"
                        >


                            {/* Image Container with Mobile Border */}
                            <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto">

                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-background/20 shadow-2xl relative">
                                    <Image
                                        src="/images/professional/toga.jpg"
                                        alt="Emmanuel Mingala"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                            <HeroDecorations stats={stats} />
                        </div>
                    </div>

                    {/* Content (Left/Bottom) */}
                    <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Available for new opportunities</span>
                        </div>

                        <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Hi, I&apos;m <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                                <TypewriterEffect
                                    words={["Emmanuel Mingala", "a Web Developer", "a Freelancer", "a Contributor"]} className="text-4xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                                />
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Transforming complex ideas into well-built web applications.
                            Focused on quality, growth, and continuous improvement.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow" asChild>
                                <Link href="#projects" onClick={() => trackEvent('button_click', {
                                    button_name: 'project_cta',
                                    source: 'hero_section'
                                })}>
                                    View Projects
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="ghost" className="rounded-full px-8 h-12 text-base hover:bg-primary/5" asChild>
                                <Link href="#contact" onClick={() => trackEvent('button_click', {
                                    button_name: 'contact_cta',
                                    source: 'hero_section'
                                })}>Initiate Contact</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Transition */}
            <div className="absolute bottom-0 w-full transform translate-y-1">
                <WaveDivider className="text-background" fill="fill-muted/30" />
            </div>
        </section>
    )
}
