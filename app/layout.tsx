import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundIllustrations } from "@/components/ui/BackgroundIllustrations";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title:
    'Full-Stack Developer in the Philippines — Web Development by EmmanDev (Emmanuel Mingala)',
  description:
    "I'm Emmanuel Mingala, the developer behind EmmanDev — a full-stack developer in the Philippines specializing in modern web development with React and Node.js. Explore my projects, read my blog, and connect for collaboration.",
  metadataBase: new URL('https://www.emmandev.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Modern Web Development by EmmanDev | Full-Stack Developer Philippines',
    description:
      "I'm Emmanuel Mingala, the developer behind EmmanDev — a full-stack developer in the Philippines specializing in modern web development with React and Node.js. Explore my projects, read my blog, and connect for collaboration.",
    url: 'https://www.emmandev.site',
    siteName: 'EmmanDev',
    type: 'website',
    images: [
      {
        url: '/images/ogImage.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview of EmmanDev Portfolio Website'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Web Development by EmmanDev',
    description: 'Full-Stack Developer in the Philippines specializing in React and Node.js web apps. See projects and get in touch.',
    images: ['/images/ogImage.jpg']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-THS71QL16S'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-THS71QL16S');`}
        </Script>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <BackgroundIllustrations />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
