'use client'

import { motion, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { Testimonial } from '@/types/cms'
import { WaveDivider } from '@/components/ui/dividers'

interface TestimonialsProps {
    testimonials: Testimonial[]
    speed?: number
}

export function Testimonials({ testimonials, speed = 30 }: TestimonialsProps) {
    const [isPaused, setIsPaused] = useState(false)
    const xRef = useRef(0)
    const containerRef = useRef<HTMLDivElement>(null)

    // Duplicate testimonials array for seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

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
        <section id="testimonials" className="relative bg-muted/20 py-32 overflow-hidden">
            {/* Top Divider */}
            <div className="absolute top-0 w-full transform -translate-y-1">
                <WaveDivider className="text-muted/20" fill="fill-background" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                        Trusted by industry leaders
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        I&apos;ve had the privilege of working with amazing teams. Here&apos;s what they have to say.
                    </p>
                </motion.div>

                {/* Infinite Scroll Container */}
                <div
                    className="relative -mx-4 overflow-hidden px-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={containerRef}
                        className="flex gap-8"
                        style={{ willChange: 'transform' }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div key={`${testimonial.id}-${index}`} className="w-[350px] md:w-[450px] flex-shrink-0">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient overlays for fade effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted/5 to-transparent backdrop-blur-[1px]" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted/5 to-transparent backdrop-blur-[1px]" />
                </div>
            </div>
        </section>
    )
}
