import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple HTML escape helper
const escapeHtml = (str: string) =>
    str.replace(/[&<>"']/g, (match) =>
        ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        } as Record<string, string>)[match]
    );

export async function POST(req: Request) {
    try {
        const rawBody = await req.json();

        // Trim inputs safely
        const name = rawBody.name?.trim();
        const email = rawBody.email?.trim();
        const facebook = rawBody.facebook?.trim();
        const message = rawBody.message?.trim();
        const honeypot = rawBody.honeypot;

        // Extract real client IP
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor
            ? forwardedFor.split(",")[0].trim()
            : "127.0.0.1";

        // Rate limit
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        // Honeypot check
        if (honeypot) {
            return NextResponse.json(
                { error: "Bot detected" },
                { status: 400 }
            );
        }

        // Required fields validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Length limits (anti-abuse)
        if (name.length > 100) {
            return NextResponse.json(
                { error: "Name too long" },
                { status: 400 }
            );
        }

        if (message.length > 2000) {
            return NextResponse.json(
                { error: "Message too long" },
                { status: 400 }
            );
        }

        if (facebook && facebook.length > 300) {
            return NextResponse.json(
                { error: "Facebook link too long" },
                { status: 400 }
            );
        }

        // Escape user input before injecting into HTML
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);
        const safeFacebook = facebook ? escapeHtml(facebook) : "N/A";

        // Send email
        await resend.emails.send({
            from: "Portfolio Contact <noreply@emmandev.site>",
            to: "devemman25@gmail.com",
            subject: "New Contact Form Submission",
            html: `
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Facebook:</b> ${safeFacebook}</p>
        <p><b>Message:</b><br/>${safeMessage}</p>
      `,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Unknown server error" },
            { status: 500 }
        );
    }
}