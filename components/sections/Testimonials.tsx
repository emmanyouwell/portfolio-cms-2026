'use client'


import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { Testimonial } from '@/types/cms'
import { WaveDivider } from '@/components/ui/dividers'
import { useInView } from '@/hooks/use-in-view'

interface TestimonialsProps {
    testimonials: Testimonial[]
    speed?: number
}

export function Testimonials({ testimonials, speed = 30 }: TestimonialsProps) {
    const { ref: headerRef, hasInView: headerInView } = useInView({ threshold: 0.2 })

    // Duplicate testimonials array for seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

    return (
        <section id="testimonials" className="relative bg-muted/20 py-32 overflow-hidden">
            {/* Top Divider */}
            <div className="absolute top-0 w-full transform -translate-y-1">
                <WaveDivider className="text-muted/20" fill="fill-background" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`mb-16 text-center max-w-3xl mx-auto transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                        Trusted by industry leaders
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        I&apos;ve had the privilege of working with amazing teams. Here&apos;s what they have to say.
                    </p>
                </div>

                {/* Infinite Scroll Container */}
                <div className="relative -mx-4 overflow-hidden px-4 group">
                    <div
                        className="flex gap-8 w-max animate-scroll group-hover:[animation-play-state:paused]"
                        style={{
                            // Adjust speed based on content width approximation or just use a fixed comfortable duration
                            animationDuration: `${testimonials.length * 10}s`
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div key={`${testimonial.id}-${index}`} className="w-[350px] md:w-[450px] flex-shrink-0">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient overlays for fade effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-muted/5 to-transparent backdrop-blur-[1px] z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-muted/5 to-transparent backdrop-blur-[1px] z-10" />
                </div>
            </div>

        </section>
    )
}
