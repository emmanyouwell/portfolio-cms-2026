'use client'

import Link from 'next/link'
import { Menu, X, Rocket } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { trackEvent } from '@/lib/gtag'

const navLinks = [
    { href: '/projects', label: 'Projects' },
    { href: '/#certificates', label: 'Certificates' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#testimonials', label: 'Testimonials' },
]

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
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
                            onClick={() => trackEvent("navigation_click", {
                                link_name: link.label,
                                link_path: link.href,
                                location: "navbar_desktop",
                            })}
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
                        <Link href="/#contact">Let&apos;s Talk</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`absolute top-full left-0 right-0 mt-4 p-4 mx-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-xl md:hidden flex flex-col space-y-4 transition-all duration-300 origin-top transform ${mobileMenuOpen
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                        }`}
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
                        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                            Let&apos;s Talk
                        </Link>
                    </Button>
                </div>
            </nav>
        </header>
    )
}
