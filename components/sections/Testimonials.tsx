import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { Testimonial } from '@/types/cms'
import { WaveDivider } from '@/components/ui/dividers'

interface TestimonialsProps {
    testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {

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
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                        What Teammates Say
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        From group projects to collaborative builds, here&apos;s feedback from people I&apos;ve worked closely with.
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
