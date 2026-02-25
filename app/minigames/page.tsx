import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Mini-Games | Emmanuel\'s Portfolio',
    description: 'Take a quick break and challenge my code to some fun mini-games.',
};

export default function MiniGamesPage() {
    return (
        <main className="min-h-screen py-24 pb-32">
            <div className="container mx-auto p-4 max-w-7xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-center">Mini-Games Arcade</h1>
                <p className="text-muted-foreground mb-12 text-lg max-w-2xl mx-auto text-center">
                    Take a break from scrolling and try out some of these interactive mini-projects.
                </p>

                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                    {/* Rock Paper Scissors Card */}
                    <Link
                        href="/minigames/rock-paper-scissors"
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

                    {/* Additional games can be added below seamlessly */}
                    <div className="p-6 rounded-2xl border border-dashed text-center opacity-50">
                        <div className="text-2xl mb-2">🚧</div>
                        <h3 className="font-semibold text-lg">More games coming soon...</h3>
                        <p className="text-sm text-muted-foreground mt-1">Check back later for new additions!</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
