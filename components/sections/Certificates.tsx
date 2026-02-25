import { CertificateCard } from '@/components/cards/CertificateCard'
import { Certificate } from '@/types/cms'

interface CertificatesProps {
    certificates: Certificate[]
}

export function Certificates({ certificates }: CertificatesProps) {
    const sortedCertificates = certificates.sort((a, b) => new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime())

    return (
        <section id="certificates" className="border-b border-border/40 bg-muted/30 py-20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Certificates & Achievements
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Professional certifications and completed courses
                    </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedCertificates.map((certificate) => (
                        <div key={certificate.id}>
                            <CertificateCard certificate={certificate} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
