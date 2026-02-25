'use client'


import { Testimonial } from '@/types/cms'
import { Quote } from 'lucide-react'
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

interface TestimonialCardProps {
    testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <Card className="h-[400px] min-w-[350px] max-w-[400px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden group border-border/50">
            {/* Large decorative quote mark */}
            <div className="absolute top-2 left-2 text-primary/10 z-0 transition-transform duration-500 group-hover:scale-110">
                <Quote className="h-24 w-24 fill-current" />
            </div>

            <CardContent className="relative z-10 p-8 pb-6 flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/40">
                    <p className="text-base leading-relaxed text-foreground/90 font-medium italic">
                        &quot;{testimonial.message}&quot;
                    </p>
                </div>
            </CardContent>

            <CardFooter className="relative z-10 p-8 pt-0 mt-auto flex items-center gap-4 shrink-0">
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
                    <CardTitle className="font-bold text-foreground text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="text-sm font-medium">
                        <span className="text-primary">{testimonial.position}</span>
                        {testimonial.company && <span className="opacity-70 text-muted-foreground"> @ {testimonial.company}</span>}
                    </CardDescription>
                </div>
            </CardFooter>
        </Card>
    )
}
