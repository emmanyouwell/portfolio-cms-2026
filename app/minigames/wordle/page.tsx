import React from 'react';
import { WordleGame } from '@/app/minigames/wordle/Game';
import Link from 'next/link';

export const metadata = {
    title: 'Wordle | Mini-Games',
    description: 'Guess the 5-letter word in 6 tries.',
};

export default function WordlePage() {
    return (
        <main className="min-h-screen py-24">
            <div className="container mx-auto p-2 sm:p-4 max-w-4xl">
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
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Wordle</h1>
                    <p className="text-muted-foreground text-lg">Guess the word in 6 tries. Tech vocabulary included!</p>
                </div>

                <div className="p-2 min-[400px]:p-4 md:p-8 rounded-2xl border bg-card text-card-foreground shadow-sm max-w-2xl mx-auto flex flex-col items-center w-full">
                    <WordleGame />
                </div>
                <div className="mt-8 text-center text-sm text-muted-foreground max-w-lg mx-auto">
                    <p>
                        * Note: Words for categories other than &quot;Default&quot; are fetched via the{' '}
                        <a
                            href="https://random-words-api.kushcreates.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline underline-offset-4"
                        >
                            Random Words API
                        </a>
                        .
                    </p>
                </div>

            </div>
        </main>
    );
}
