import { Contact } from "@/components/sections/Contact";

export const metadata = {
    title: "Contact | Emmanuel Mingala",
    description: "Get in touch with me for exciting new projects or opportunities.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen relative pt-24 pb-12 overflow-hidden bg-background">
            <div className="relative z-10 w-full h-full">
                <Contact />
            </div>
        </main>
    );
}
