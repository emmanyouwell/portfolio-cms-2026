'use client'

import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Rocket } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { slideDown } from '@/lib/motion-variants'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#blog', label: 'Blog' },
    { href: '#testimonials', label: 'Testimonials' },
]

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={slideDown}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <nav
                className={`relative flex items-center justify-between px-6 transition-all duration-300 ${scrolled
                    ? 'w-[95%] max-w-5xl h-14 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg supports-[backdrop-filter]:bg-background/60'
                    : 'w-full max-w-7xl h-16 bg-transparent'
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Rocket className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        EmmanDev
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Button & Theme Toggle (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <Button size={scrolled ? "sm" : "default"} className="rounded-full shadow-md shadow-primary/20" asChild>
                        <Link href="#contact">Let&apos;s Talk</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="p-1 rounded-md hover:bg-muted"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-full left-0 right-0 mt-4 p-4 mx-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-xl md:hidden flex flex-col space-y-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Button asChild className="w-full rounded-xl">
                            <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                                Let&apos;s Talk
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </nav>
        </motion.header>
    )
}
