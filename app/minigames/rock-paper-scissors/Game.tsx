"use client";

import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Choice, GameState, getRandomChoice, determineWinner } from './logic';
import { ScoreBoard } from './components/ScoreBoard';
import { GameBoard } from './components/GameBoard';
import { ResultModal } from './components/ResultModal';
import './styles.css';

export function RockPaperScissorsGame() {
    const [gameState, setGameState] = useState<GameState>({
        playerScore: 0,
        computerScore: 0,
        playerChoice: null,
        computerChoice: null,
        result: null,
        roundCount: 0,
    });

    const triggerWinAnimation = () => {
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#4ade80', '#fbbf24', '#f87171']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#4ade80', '#fbbf24', '#f87171']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    const handlePlay = useCallback((choice: Choice) => {
        if (gameState.result) return; // Wait for reset to play again

        const computerChoice = getRandomChoice();
        const result = determineWinner(choice, computerChoice);

        let newPlayerScore = gameState.playerScore;
        let newComputerScore = gameState.computerScore;

        if (result === 'win') {
            newPlayerScore += 1;
            triggerWinAnimation();
        } else if (result === 'lose') {
            newComputerScore += 1;
        }

        setGameState((prev) => ({
            ...prev,
            playerChoice: choice,
            computerChoice,
            result,
            playerScore: newPlayerScore,
            computerScore: newComputerScore,
            roundCount: prev.roundCount + 1,
        }));
    }, [gameState.result, gameState.playerScore, gameState.computerScore]);

    const handleReset = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            playerChoice: null,
            computerChoice: null,
            result: null,
        }));
    }, []);

    return (
        <div className="rps-container">
            <ScoreBoard
                playerScore={gameState.playerScore}
                computerScore={gameState.computerScore}
            />

            {!gameState.result ? (
                <GameBoard onPlay={handlePlay} disabled={!!gameState.result} />
            ) : (
                <ResultModal
                    result={gameState.result}
                    playerChoice={gameState.playerChoice}
                    computerChoice={gameState.computerChoice}
                    onReset={handleReset}
                />
            )}
        </div>
    );
}
