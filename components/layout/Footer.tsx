'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Rocket, Facebook } from 'lucide-react'
import { CurveDivider } from '@/components/ui/dividers'
import { trackEvent } from '@/lib/gtag'

const socialLinks = [
    { href: 'https://github.com/emmanyouwell', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/emmanuel-mingala/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://www.facebook.com/emmanueellll', icon: Facebook, label: 'Facebook' },
    { href: 'mailto:emingala02@gmail.com', icon: Mail, label: 'Email' },
]

const footerLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#blog', label: 'Blog' },
    { href: '#testimonials', label: 'Testimonials' },
]

export function Footer() {
    return (
        <footer className="relative bg-muted/20 overflow-hidden">
            {/* Top Divider */}
            <div className="absolute top-0 w-full transform -translate-y-[99%]">
                <CurveDivider className="text-muted/20" fill="fill-current" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <Rocket className="w-6 h-6 text-primary" />
                            <span className="text-2xl font-bold tracking-tight">EmmanDev</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                            Crafting digital experiences that merge creativity with technical excellence.
                            Let&apos;s build something extraordinary together.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        onClick={() => trackEvent('outbound_link', {
                                            link_name: social.label,
                                            location: "footer"
                                        })}
                                        className="p-3 rounded-full bg-background border border-border text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 active:scale-90"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold">Explore</h4>
                        <ul className="space-y-4">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => trackEvent("footer_link_click", {
                                            link_name: link.label,
                                            link_path: link.href,
                                            location: "footer",
                                        })}
                                        className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2 group-hover:bg-primary transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold">Contact</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:emingala02@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => trackEvent('outbound_click', {
                                    link_name: 'email',
                                    location: 'footer'
                                })}>
                                    emingala02@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} EmmanDev. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground/60 flex items-center gap-1">
                        Designed with <span className="text-red-500">♥</span> and Next.js
                    </p>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </footer>
    )
}
