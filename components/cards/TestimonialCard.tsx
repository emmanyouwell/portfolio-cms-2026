'use client'


import { Testimonial } from '@/types/cms'
import { Quote } from 'lucide-react'


interface TestimonialCardProps {
    testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div
            className="h-[400px] min-w-[350px] max-w-[400px] flex-shrink-0 pt-4 transition-transform duration-300 hover:-translate-y-1"
        >
            <div className="relative h-full">
                {/* Large decorative quote mark */}
                <div className="absolute -top-4 -left-2 text-primary/20 z-10">
                    <Quote className="h-16 w-16 fill-current" />
                </div>

                <div className="h-full overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl bg-gradient-to-br from-card to-card/50 border border-white/5 shadow-lg backdrop-blur-sm p-1">
                    <div className="h-full bg-background/30 rounded-tr-[2.8rem] rounded-bl-[2.8rem] rounded-tl-lg rounded-br-lg p-8 flex flex-col">

                        <div className="relative z-20 mb-6 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/40">
                            <p className="text-base leading-relaxed text-foreground/90 font-medium italic">
                                &quot;{testimonial.message}&quot;
                            </p>
                        </div>

                        <div className="mt-auto flex items-center gap-4">
                            {/* Avatar */}
                            <div className="relative h-14 w-14 flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent opacity-20 blur-sm" />
                                <div className="relative h-full w-full rounded-full bg-background border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                                    <span className="text-sm font-bold text-primary">
                                        {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div>
                                <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground font-medium">
                                    <span className="text-primary">{testimonial.position}</span>
                                    {testimonial.company && <span className="opacity-70"> @ {testimonial.company}</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
