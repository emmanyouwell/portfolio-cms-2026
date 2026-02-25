import React from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/gtag';

export function MiniGames() {
    return (
        <section id="minigames" className="w-full py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Mini-Games</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Interactive side projects and classic games to test my skills (and your luck).
                    </p>
                </div>

                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                    {/* RPS Game Card */}
                    <Link
                        href="/minigames/rock-paper-scissors"
                        onClick={() => trackEvent('minigame_click', { game_name: 'Rock Paper Scissors', source: 'homepage' })}
                        className="group relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            ✌️
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Rock Paper Scissors</h3>
                            <p className="text-muted-foreground text-base">
                                Challenge the computer to a classic game of Rock Paper Scissors. First to boredom wins. Good luck!
                            </p>
                        </div>

                        <div className="hidden md:flex items-center justify-center p-3 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </div>
                    </Link>

                    {/* Tic Tac Toe Card */}
                    <Link
                        href="/minigames/tic-tac-toe"
                        onClick={() => trackEvent('minigame_click', { game_name: 'Tic Tac Toe', source: 'homepage' })}
                        className="group relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex-shrink-0 w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            ❌
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Tic Tac Toe</h3>
                            <p className="text-muted-foreground text-base">
                                A timeless classic. Grab a friend and see who can claim three in a row first! Outsmart your opponent.
                            </p>
                        </div>

                        <div className="hidden md:flex items-center justify-center p-3 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/minigames"
                        onClick={() => trackEvent('arcade_view_all_click', { source: 'homepage' })}
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary transition-colors"
                    >
                        View all arcade games <svg className="ml-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
