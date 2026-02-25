'use client'

import { Send, Facebook, Mail, MessageSquare, Loader2 } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CurveDivider } from '@/components/ui/dividers'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
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
    const { ref: contentRef, hasInView: contentInView } = useInView({ threshold: 0.2 })
    const { ref: formRef, hasInView: formInView } = useInView({ threshold: 0.2 })

    const form = useForm<FormData>({
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

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || "Something went wrong");
            }
            trackEvent('form_submit', {
                form_name: 'contact_form',
                source: 'contact_section'
            })
            form.reset()
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
                    <div
                        ref={contentRef}
                        className={`transition-all duration-700 ${contentInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                            }`}
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
                                        source: 'contact_section',
                                        form_type: 'contact'
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
                                        source: 'contact_section',
                                        form_type: 'contact'
                                    })} className="text-muted-foreground hover:text-primary transition-colors">
                                        Emmanuel Mingala
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div
                        ref={formRef}
                        className={`bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl transition-all duration-700 delay-200 ${formInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                            }`}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Name" {...field} className="bg-background/50 border-primary/20 focus:border-primary" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="your@email.com" {...field} className="bg-background/50 border-primary/20 focus:border-primary" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Facebook (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your Facebook Profile Link" {...field} className="bg-background/50 border-primary/20 focus:border-primary" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell me about your project..." rows={5} {...field} className="bg-background/50 border-primary/20 focus:border-primary resize-none" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}
