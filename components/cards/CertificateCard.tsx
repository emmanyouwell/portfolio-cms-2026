'use client'


import Link from 'next/link'
import { ExternalLink, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog'
import { Certificate } from '@/types/cms'
import Image from 'next/image'

interface CertificateCardProps {
    certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
    const content = (
        <Card className="group h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="p-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {/* Certificate Image Placeholder */}
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        {certificate.image.url ? (
                            <Image src={certificate.image.url} alt={certificate.title} fill className="object-cover" loading="lazy" />
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
            </CardHeader>

            <CardContent className="p-6 flex-grow flex flex-col">
                {/* Issuer */}
                <div className="mb-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
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
                <CardTitle className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {certificate.title}
                </CardTitle>

                {/* Date */}
                <div className="flex items-center gap-2 mt-auto pt-4 text-sm text-muted-foreground">
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
        <Dialog>
            <DialogTrigger asChild>
                <div className="h-full cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                    {content}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-background border-muted">
                <DialogHeader className="p-6 pb-2 border-b">
                    <DialogTitle className="text-xl md:text-2xl font-bold pr-6">
                        {certificate.title}
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                            <span className="flex items-center gap-2 font-medium text-foreground">
                                {certificate.issuer.image.url ? (
                                    <Image src={certificate.issuer.image.url} alt={certificate.issuer.name} width={20} height={20} className="object-cover rounded-full bg-muted" />
                                ) : (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-primary">
                                        {certificate.issuer.name.substring(0, 2).toUpperCase()}
                                    </span>
                                )}
                                {certificate.issuer.name}
                            </span>
                            <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(certificate.dateIssued).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                })}
                            </span>
                            <Badge variant="secondary" className="ml-auto">{certificate.category}</Badge>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-muted/30 p-2 md:p-6 flex items-center justify-center">
                    {certificate.image.url ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={certificate.image.url}
                                alt={certificate.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                            <p className="font-medium">Image Not Available</p>
                        </div>
                    )}
                </div>

                {certificate.href && (
                    <div className="p-4 md:p-6 md:pt-4 flex justify-end">
                        <Button asChild>
                            <Link
                                href={certificate.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gap-2 w-full md:w-auto"
                            >
                                <ExternalLink className="h-4 w-4" />
                                View Original Credential
                            </Link>
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
