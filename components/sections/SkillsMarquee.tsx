'use client'

import { motion, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import { Skill } from '@/types/cms'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SkillsMarqueeProps {
    skills: Skill[]
    speed?: number
    pauseOnHover?: boolean
}

export function SkillsMarquee({
    skills,
    speed = 30,
    pauseOnHover = true
}: SkillsMarqueeProps) {
    const [isPaused, setIsPaused] = useState(false)
    const xRef = useRef(0)
    const containerRef = useRef<HTMLDivElement>(null)

    // Duplicate skills array for seamless loop
    const duplicatedSkills = [...skills, ...skills, ...skills]

    useAnimationFrame((time, delta) => {
        if (!isPaused && containerRef.current) {
            xRef.current -= (delta / 1000) * speed

            // Reset position for seamless loop
            const containerWidth = containerRef.current.scrollWidth / 3
            if (Math.abs(xRef.current) >= containerWidth) {
                xRef.current = 0
            }

            containerRef.current.style.transform = `translateX(${xRef.current}px)`
        }
    })

    return (
        <div className="py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 text-center"
                >
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Powered By</h2>
                </motion.div>

                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                    onMouseLeave={() => pauseOnHover && setIsPaused(false)}
                >
                    <div
                        ref={containerRef}
                        className="flex gap-8"
                        style={{ willChange: 'transform' }}
                    >
                        {duplicatedSkills.map((skill, index) => (
                            <div
                                key={`${skill.name}-${index}`}
                                className={cn(
                                    "flex flex-shrink-0 items-center justify-center rounded-lg bg-card px-8 py-6 shadow-sm transition-all",
                                    "hover:shadow-md hover:scale-105"
                                )}
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Icon placeholder */}
                                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">{skill?.stackIcon ? (<Image src={skill.stackIcon} alt={skill.name} width={24} height={24} className="object-cover" />) : (<span className="text-xs font-bold text-primary">
                                        {skill.name.substring(0, 2).toUpperCase()}
                                    </span>)
                                    }
                                    </div>
                                    <span className="text-sm font-medium text-foreground whitespace-nowrap">
                                        {skill.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient overlays for fade effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-muted/30 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-muted/30 to-transparent" />
                </div>
            </div>
        </div >
    )
}
