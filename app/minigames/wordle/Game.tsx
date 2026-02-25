"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { trackEvent } from '@/lib/gtag';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Tech-leaning 5-letter word list
const WORDS = [
    "REACT", "BUILD", "DEBUG", "PIXEL", "STACK", "QUEUE", "BYTES", "SCOPE",
    "CLASS", "LOGIC", "VIEWS", "PAGES", "HOOKS", "STATE", "PROPS", "ASYNC",
    "AWAIT", "FETCH", "QUERY", "INDEX", "TOKEN", "CACHE", "CLOUD", "NODES",
    "BOARD", "WORLD", "GAMES", "TYPES", "ARRAY", "MOUSE", "CLICK", "EVENT",
    "TRACK", "LINUX", "APPLE", "SWIFT", "SHELL", "BASH", "FONTS", "GLYPH",
    "MACRO", "MICRO", "ALARM", "ALERT", "THEME", "LOGIN", "ADMIN", "ROUTE",
    "CRASH", "VIRUS", "CYBER", "ERROR", "PANEL", "PORTS", "PROXY", "SERVE"
];

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

const CATEGORIES = [
    "Default",
    "Brainrot",
    "Wordle",
    "Animals",
    "Sports",
    "Softwares",
    "Programming Languages"
];

export function WordleGame() {
    const [category, setCategory] = useState("Default");
    const [isLoading, setIsLoading] = useState(false);
    const [targetWord, setTargetWord] = useState('');
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [shakeCurrentRow, setShakeCurrentRow] = useState(false);
    const [message, setMessage] = useState('');

    const startNewGame = useCallback(async () => {
        setIsLoading(true);
        try {
            let nextWord = '';
            if (category === 'Default') {
                nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
            } else {
                const res = await fetch(`https://random-words-api.kushcreates.com/api?category=${encodeURIComponent(category)}&length=5`);
                if (!res.ok) throw new Error('API format error');
                const data = await res.json();
                const index = Math.floor(Math.random() * data.length)
                if (Array.isArray(data) && data.length > 0 && data[index].word) {
                    nextWord = data[index].word.toUpperCase();
                } else if (data && data.word) {
                    nextWord = data.word.toUpperCase();
                } else {
                    nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
                }
            }

            if (!nextWord || nextWord.length !== 5) {
                nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
            }

            setTargetWord(nextWord);
            setGuesses([]);
            setCurrentGuess('');
            setGameStatus('playing');
            setMessage('');
            trackEvent('minigame_start', { game_name: 'Wordle', category });
        } catch (error) {
            console.error(error);
            setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
            setGuesses([]);
            setCurrentGuess('');
            setGameStatus('playing');
            setMessage('Failed to load category, using default');
            trackEvent('minigame_start', { game_name: 'Wordle', category: 'Default (Fallback)' });
        } finally {
            setIsLoading(false);
        }
    }, [category]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 2000);
    };

    const submitGuess = useCallback(() => {
        if (currentGuess.length !== 5) {
            setShakeCurrentRow(true);
            setTimeout(() => setShakeCurrentRow(false), 500);
            showMessage('Not enough letters');
            return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        if (currentGuess === targetWord) {
            setGameStatus('won');
            trackEvent('minigame_win', { game_name: 'Wordle', attempts: newGuesses.length });
        } else if (newGuesses.length >= 6) {
            setGameStatus('lost');
            trackEvent('minigame_loss', { game_name: 'Wordle' });
        }
    }, [currentGuess, guesses, targetWord]);

    const handleKeyPress = useCallback((key: string) => {
        if (gameStatus !== 'playing' || isLoading) return;

        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key);
        }
    }, [currentGuess, gameStatus, submitGuess]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            const key = e.key.toUpperCase();
            if (key === 'ENTER') {
                handleKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                handleKeyPress('BACKSPACE');
            } else if (/^[A-Z]$/.test(key)) {
                handleKeyPress(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyPress]);

    // Calculate keyboard colors
    const keyboardStatus: Record<string, LetterStatus> = {};
    guesses.forEach(guess => {
        for (let i = 0; i < 5; i++) {
            const letter = guess[i];
            if (targetWord[i] === letter) {
                keyboardStatus[letter] = 'correct';
            } else if (targetWord.includes(letter) && keyboardStatus[letter] !== 'correct') {
                keyboardStatus[letter] = 'present';
            } else if (!targetWord.includes(letter)) {
                keyboardStatus[letter] = 'absent';
            }
        }
    });

    const renderCell = (letter: string, status: LetterStatus) => {
        return (
            <div
                key={Math.random()}
                className={cn(
                    "w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-xl min-[400px]:text-2xl font-bold uppercase transition-all duration-300",
                    status === 'empty' && "border-border/50 text-foreground",
                    status === 'absent' && "bg-muted border-muted text-muted-foreground",
                    status === 'present' && "bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400",
                    status === 'correct' && "bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400"
                )}
            >
                {letter}
            </div>
        );
    };

    const renderGrid = () => {
        const rows = [];
        for (let i = 0; i < 6; i++) {
            const isCurrentRow = i === guesses.length;
            const guess = isCurrentRow ? currentGuess.padEnd(5, ' ') : (guesses[i] || '     ');

            let statuses = Array(5).fill('empty');
            if (i < guesses.length) {
                // Evaluate statuses for submitted guess
                const targetLetters = targetWord.split('');
                const guessLetters = guess.split('');
                statuses = Array(5).fill('absent');

                // Pass 1: find corrects
                guessLetters.forEach((letter, j) => {
                    if (letter === targetLetters[j]) {
                        statuses[j] = 'correct';
                        targetLetters[j] = ''; // cross out
                    }
                });

                // Pass 2: find presents
                guessLetters.forEach((letter, j) => {
                    if (statuses[j] !== 'correct' && targetLetters.includes(letter)) {
                        statuses[j] = 'present';
                        targetLetters[targetLetters.indexOf(letter)] = ''; // cross out
                    }
                });
            }

            rows.push(
                <div
                    key={i}
                    className={cn(
                        "flex gap-1 min-[400px]:gap-2",
                        isCurrentRow && shakeCurrentRow && "animate-shake"
                    )}
                >
                    {guess.split('').map((letter, j) => renderCell(letter !== ' ' ? letter : '', statuses[j]))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto">
            {message && (
                <div className="absolute top-4 bg-foreground text-background px-4 py-2 rounded-md font-medium z-10 animate-fade-in">
                    {message}
                </div>
            )}

            <div className="w-full flex justify-center items-center gap-4 mb-4 px-2">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-background border rounded-md px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-ring w-auto"
                    disabled={isLoading}
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 mb-8 select-none">
                {renderGrid()}
            </div>

            <div className="w-full flex flex-col gap-1.5 min-[400px]:gap-2 select-none px-0.5 sm:px-1">
                {KEYBOARD_ROWS.map((row, i) => (
                    <div key={i} className="flex justify-center gap-1 sm:gap-2 w-full">
                        {row.map(key => {
                            const status = keyboardStatus[key] || 'empty';
                            const isActionKey = key === 'ENTER' || key === 'BACKSPACE';

                            return (
                                <button
                                    key={key}
                                    onClick={() => handleKeyPress(key)}
                                    className={cn(
                                        "h-10 min-[400px]:h-12 min-w-[1.25rem] min-[400px]:min-w-[2rem] sm:min-w-[2.5rem] rounded text-[10px] min-[400px]:text-xs md:text-sm font-semibold flex items-center justify-center transition-colors px-0.5 min-[400px]:px-1 sm:px-2",
                                        isActionKey ? "w-10 min-[400px]:w-12 sm:w-16 text-[8px] min-[400px]:text-[10px] sm:text-xs tracking-tighter min-[400px]:tracking-normal" : "flex-1",
                                        status === 'empty' && "bg-muted/50 hover:bg-muted text-foreground",
                                        status === 'absent' && "bg-muted text-muted-foreground/50 opacity-80",
                                        status === 'present' && "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
                                        status === 'correct' && "bg-green-500/20 text-green-600 dark:text-green-400"
                                    )}
                                >
                                    {key === 'BACKSPACE' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 4H8.2L1 12l7.2 8H21a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /><path d="m18 9-6 6" /><path d="m12 9 6 6" /></svg>
                                    ) : key}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {(gameStatus === 'won' || gameStatus === 'lost') && (
                <div className="mt-8 flex flex-col items-center gap-4 animate-fade-in p-6 border rounded-xl bg-muted/20 w-full text-center">
                    <h3 className="text-2xl font-bold">
                        {gameStatus === 'won' ? 'You Won!' : 'Game Over'}
                    </h3>
                    <p className="text-muted-foreground">
                        The word was <strong className="text-foreground text-xl ml-1">{targetWord}</strong>
                    </p>
                    <Button onClick={startNewGame} size="lg" className="w-full sm:w-auto mt-2">
                        Play Again
                    </Button>
                </div>
            )}

            {/* Provide Tailwind shake animation if needed via style */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
