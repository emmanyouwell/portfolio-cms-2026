

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
    speed = 200,
    pauseOnHover = true
}: SkillsMarqueeProps) {
    // We need 2 sets of skills for the seamless loop
    // But to be safe on wider screens, we can keep 3 or just ensure the container is wide enough
    // The standard CSS marquee technique uses 2 identical sets animating to -100%
    const duplicatedSkills = [...skills, ...skills]

    return (
        <div className="py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Powered By</h2>
                </div>

                <div
                    className={cn(
                        "relative flex overflow-hidden mask-linear-gradient",
                        pauseOnHover && "group"
                    )}
                >
                    {/* First Marquee Item */}
                    <div
                        className={cn(
                            "flex min-w-full shrink-0 gap-8 animate-marquee items-center justify-around pr-8",
                            pauseOnHover && "group-hover:[animation-play-state:paused]"
                        )}
                        style={{ animationDuration: `${speed}s` }}
                    >
                        {duplicatedSkills.map((skill, index) => (
                            <SkillCard key={`1-${skill.name}-${index}`} skill={skill} />
                        ))}
                    </div>

                    {/* Second Marquee Item (Duplicate) */}
                    <div
                        className={cn(
                            "flex min-w-full shrink-0 gap-8 animate-marquee items-center justify-around pr-8",
                            pauseOnHover && "group-hover:[animation-play-state:paused]"
                        )}
                        style={{ animationDuration: `${speed}s` }}
                    >
                        {duplicatedSkills.map((skill, index) => (
                            <SkillCard key={`2-${skill.name}-${index}`} skill={skill} />
                        ))}
                    </div>

                    {/* Gradient overlays for fade effect */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                </div>
            </div>
        </div >
    )
}

function SkillCard({ skill }: { skill: Skill }) {
    return (
        <div
            className={cn(
                "flex flex-shrink-0 items-center justify-center rounded-lg bg-card px-8 py-6 shadow-sm transition-all",
                "hover:shadow-md hover:scale-105"
            )}
        >
            <div className="flex items-center space-x-3">
                {/* Icon placeholder */}
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    {skill?.stackIcon ? (
                        <Image src={skill.stackIcon} alt={skill.name} width={24} height={24} className="object-cover" />
                    ) : (
                        <span className="text-xs font-bold text-primary">
                            {skill.name.substring(0, 2).toUpperCase()}
                        </span>
                    )}
                </div>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {skill.name}
                </span>
            </div>
        </div>
    )
}
