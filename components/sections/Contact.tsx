'use client'

import { motion } from 'framer-motion'
import { Send, Facebook, Mail, MessageSquare, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { CurveDivider } from '@/components/ui/dividers'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from "sonner"
import { trackEvent } from '@/lib/gtag'

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    facebook: z.string().optional(),
    message: z.string().min(3, { message: "Message must be at least 3 characters." }),
})

type FormData = z.infer<typeof formSchema>

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            facebook: "",
            message: "",
        },
    })

    async function onSubmit(values: FormData) {
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || "Something went wrong");
            }
            trackEvent('form_submit', {
                form_name: 'contact_form',
                location: 'contact_section'
            })
            reset()
            toast.success("Message sent successfully!", {
                description: "I'll get back to you as soon as possible.",
            })
        } catch (error) {
            console.error(error)
            toast.error("Failed to send message", {
                description: error instanceof Error ? error.message : "Please try again later.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="relative bg-background pt-32 pb-24 overflow-hidden">
            {/* Top Divider */}
            <div className="absolute top-0 w-full transform -translate-y-1">
                <CurveDivider className="text-background" fill="fill-muted/20" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 mb-4 text-primary font-medium">
                            <MessageSquare className="w-5 h-5" />
                            <span>Get in Touch</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Let&apos;s Build Something <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Amazing Together
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            Have a project in mind or just want to say hi? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Email Me</h3>
                                    <a href="mailto:emingala02@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => trackEvent('outbound_click', {
                                        link_name: 'email',
                                        location: 'contact_section',
                                        type: 'contact'
                                    })}>
                                        emingala02@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Facebook className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Facebook</h3>
                                    <a href="https://www.facebook.com/emmanueellll" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('outbound_click', {
                                        link_name: 'facebook',
                                        location: 'contact_section',
                                        type: 'contact'
                                    })} className="text-muted-foreground hover:text-primary transition-colors">
                                        Emmanuel Mingala
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Your Name"
                                    {...register("name")}
                                    className={cn(
                                        "bg-background/50 border-primary/20 focus:border-primary",
                                        errors.name && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive font-medium">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    {...register("email")}
                                    className={cn(
                                        "bg-background/50 border-primary/20 focus:border-primary",
                                        errors.email && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="facebook" className="text-sm font-medium text-foreground">
                                    Facebook (Optional)
                                </label>
                                <Input
                                    id="facebook"
                                    type="text"
                                    placeholder="Your Facebook Profile Link"
                                    {...register("facebook")}
                                    className="bg-background/50 border-primary/20 focus:border-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    {...register("message")}
                                    className={cn(
                                        "bg-background/50 border-primary/20 focus:border-primary resize-none",
                                        errors.message && "border-destructive focus-visible:ring-destructive"
                                    )}
                                />
                                {errors.message && (
                                    <p className="text-sm text-destructive font-medium">{errors.message.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending...
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
