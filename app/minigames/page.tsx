import React from 'react';
import ArcadeList from './ArcadeList';

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

                <ArcadeList />
            </div>
        </main>
    );
}
