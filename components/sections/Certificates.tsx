'use client'


import { CertificateCard } from '@/components/cards/CertificateCard'
import { Certificate } from '@/types/cms'
import { useInView } from '@/hooks/use-in-view'

interface CertificatesProps {
    certificates: Certificate[]
}

export function Certificates({ certificates }: CertificatesProps) {
    const sortedCertificates = certificates.sort((a, b) => new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime())
    const { ref: headerRef, hasInView: headerInView } = useInView({ threshold: 0.2 })
    const { ref: gridRef, hasInView: gridInView } = useInView({ threshold: 0.1 })

    return (
        <section id="certificates" className="border-b border-border/40 bg-muted/30 py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className={`mb-12 text-center transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Certificates & Achievements
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Professional certifications and completed courses
                    </p>
                </div>

                {/* Certificates Grid */}
                <div
                    ref={gridRef}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {sortedCertificates.map((certificate, index) => (
                        <div
                            key={certificate.id}
                            className={`transition-all duration-700 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <CertificateCard certificate={certificate} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
