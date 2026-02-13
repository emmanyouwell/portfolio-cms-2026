'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Certificate } from '@/types/cms'
import Image from 'next/image'

interface CertificateCardProps {
    certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
    const content = (
        <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {/* Certificate Image Placeholder */}
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    {certificate.image.url ? (
                        <Image src={certificate.image.url} alt={certificate.title} fill className="object-cover" />
                    ) :
                        (<p className="text-center text-sm text-muted-foreground">
                            Certificate
                            <br />
                            <span className="text-xs">{certificate.title}</span>
                        </p>)}
                </div>

                {/* Category Badge */}
                <div className="absolute right-4 top-4">
                    <Badge variant="secondary">{certificate.category}</Badge>
                </div>

                {/* External Link Icon */}
                {certificate.href && (
                    <div className="absolute left-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-background p-2 shadow-lg">
                            <ExternalLink className="h-4 w-4" />
                        </div>
                    </div>
                )}
            </div>

            <CardContent className="p-6">
                {/* Issuer */}
                <div className="mb-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {certificate.issuer.image.url ? (
                            <Image src={certificate.issuer.image.url} alt={certificate.issuer.name} width={40} height={40} className="object-cover" />
                        ) :
                            (<span className="text-xs font-bold text-primary">
                                {certificate.issuer.name.substring(0, 2).toUpperCase()}
                            </span>)
                        }
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                        {certificate.issuer.name}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {certificate.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                        {new Date(certificate.dateIssued).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                        })}
                    </span>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
        >
            {certificate.href ? (
                <Link
                    href={certificate.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                >
                    {content}
                </Link>
            ) : (
                content
            )}
        </motion.div>
    )
}
