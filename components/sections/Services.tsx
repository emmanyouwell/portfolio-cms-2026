

import { Layout, Smartphone, Server } from 'lucide-react'
import { Skill } from '@/types/cms'
import { SkillsMarquee } from './SkillsMarquee'

interface ServicesProps {
    skills: Skill[]
}

const services = [
    {
        title: 'Frontend Development',
        description: 'Building responsive, pixel-perfect web applications with modern frameworks like Next.js and React.',
        icon: Layout,
        color: 'text-blue-500'
    },
    {
        title: 'Mobile First Design',
        description: 'Ensuring your application looks and feels amazing on every device, from mobile phones to large desktops.',
        icon: Smartphone,
        color: 'text-purple-500'
    },
    {
        title: 'Backend Architecture',
        description: 'Designing robust, scalable server-side systems and APIs using Node.js and modern databases.',
        icon: Server,
        color: 'text-green-500'
    }
]

export function Services({ skills }: ServicesProps) {
    return (
        <section id="services" className="relative bg-muted/10 py-24 overflow-hidden">
            {/* Top Divider */}


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Crafting Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Experiences
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From concept to deployment, I handle the entire lifecycle of modern web development.
                    </p>
                </div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>

            {/* Tech Stack Integration */}
            <div className="relative">
                <SkillsMarquee skills={skills} pauseOnHover={true} />
            </div>
        </section>
    )
}

function ServiceCard({ service }: { service: typeof services[0] }) {
    return (
        <div className="group p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${service.color}`}>
                <service.icon className="w-24 h-24" />
            </div>

            <div className={`w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {service.description}
            </p>
        </div>
    )
}
