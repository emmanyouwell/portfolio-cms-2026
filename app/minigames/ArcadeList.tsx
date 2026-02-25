"use client"

import React from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';

export default function ArcadeList() {
    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {/* Rock Paper Scissors Card */}
            <Link
                href="/minigames/rock-paper-scissors"
                onClick={() => trackEvent('minigame_click', { game_name: 'Rock Paper Scissors', source: 'arcade_page' })}
                className="group relative flex items-center gap-6 p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    ✌️
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Rock Paper Scissors</h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Challenge the computer to a classic game of Rock Paper Scissors. Can you get a winning streak?
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </Link>

            {/* Tic Tac Toe Card */}
            <Link
                href="/minigames/tic-tac-toe"
                onClick={() => trackEvent('minigame_click', { game_name: 'Tic Tac Toe', source: 'arcade_page' })}
                className="group relative flex items-center gap-6 p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    ❌
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Tic Tac Toe</h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        A timeless classic. Grab a friend and see who can claim three in a row first!
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </Link>

            {/* Wordle Card */}
            <Link
                href="/minigames/wordle"
                onClick={() => trackEvent('minigame_click', { game_name: 'Wordle', source: 'arcade_page' })}
                className="group relative flex items-center gap-6 p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    🟩
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Wordle</h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Guess the hidden 5-letter word in 6 tries. Featuring a tech-inspired vocabulary!
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </Link>

            {/* Additional games can be added below seamlessly */}
            <div className="p-6 rounded-2xl border border-dashed text-center opacity-50">
                <div className="text-2xl mb-2">🚧</div>
                <h3 className="font-semibold text-lg">More games coming soon...</h3>
                <p className="text-sm text-muted-foreground mt-1">Check back later for new additions!</p>
            </div>
        </div>
    );
}
