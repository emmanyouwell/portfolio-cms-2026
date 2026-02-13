import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, facebook, message } = await req.json();

        await resend.emails.send({
            from: 'Portfolio Contact <noreply@emmandev.site>', // must be your verified domain
            to: 'devemman25@gmail.com', // your inbox
            subject: 'New Contact Form Submission',
            html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Facebook:</b> ${facebook}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
}
