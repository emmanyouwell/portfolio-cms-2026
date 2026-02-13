import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundIllustrations } from "@/components/ui/BackgroundIllustrations";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Your Name - Full Stack Developer",
  description: "A passionate full-stack developer crafting exceptional digital experiences with modern technologies and creative solutions.",
  keywords: ["portfolio", "web developer", "full stack", "react", "next.js"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio | Your Name",
    description: "Full Stack Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
