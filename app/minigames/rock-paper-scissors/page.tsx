import React from 'react';
import { RockPaperScissorsGame } from '@/app/minigames/rock-paper-scissors/Game';
import Link from 'next/link';

export const metadata = {
    title: 'Rock Paper Scissors | Mini-Games',
    description: 'Play a friendly game of Rock Paper Scissors against the computer.',
};

export default function RPSGamePage() {
    return (
        <main className="min-h-screen py-24">
            <div className="container mx-auto p-4 max-w-4xl">
                <div className="mb-8">
                    <Link
                        href="/minigames"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Back to Arcade
                    </Link>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Rock Paper Scissors</h1>
                    <p className="text-muted-foreground text-lg">First to boredom wins. Good luck!</p>
                </div>

                <div className="p-4 md:p-8 rounded-2xl border bg-card text-card-foreground shadow-sm max-w-2xl mx-auto">
                    <RockPaperScissorsGame />
                </div>
            </div>
        </main>
    );
}
