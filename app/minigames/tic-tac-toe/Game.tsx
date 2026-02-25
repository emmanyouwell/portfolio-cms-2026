"use client";

import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameState, calculateWinner } from './logic';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import './styles.css';

export function TicTacToeGame() {
    const [gameState, setGameState] = useState<GameState>({
        board: Array(9).fill(null),
        xIsNext: true,
        result: null,
        xScore: 0,
        oScore: 0,
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
                colors: ['#38bdf8', '#f472b6', '#fbbf24']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#38bdf8', '#f472b6', '#fbbf24']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    const handleClick = useCallback((i: number) => {
        if (gameState.result || gameState.board[i]) return;

        const newBoard = [...gameState.board];
        newBoard[i] = gameState.xIsNext ? 'X' : 'O';

        const result = calculateWinner(newBoard);
        let newXScore = gameState.xScore;
        let newOScore = gameState.oScore;

        if (result === 'X') {
            newXScore += 1;
            triggerWinAnimation();
        } else if (result === 'O') {
            newOScore += 1;
            triggerWinAnimation();
        }

        setGameState((prev) => ({
            ...prev,
            board: newBoard,
            xIsNext: !prev.xIsNext,
            result,
            xScore: newXScore,
            oScore: newOScore,
        }));
    }, [gameState]);

    const handleReset = useCallback(() => {
        setGameState((prev) => ({
            ...prev,
            board: Array(9).fill(null),
            xIsNext: true,
            result: null,
        }));
    }, []);

    const getStatusText = () => {
        if (gameState.result === 'tie') {
            return <span className="ttt-tie">It&apos;s a Tie!</span>;
        }
        if (gameState.result === 'X') {
            return <span className="ttt-win-x">✖️ Wins!</span>;
        }
        if (gameState.result === 'O') {
            return <span className="ttt-win-o">⭕ Wins!</span>;
        }
        return (
            <span>
                Next player: {gameState.xIsNext ? <span className="ttt-win-x">✖️</span> : <span className="ttt-win-o">⭕</span>}
            </span>
        );
    };

    return (
        <div className="ttt-container">
            <ScoreBoard xScore={gameState.xScore} oScore={gameState.oScore} />

            <div className="ttt-turn-indicator">
                {getStatusText()}
            </div>

            <Board
                squares={gameState.board}
                onClick={handleClick}
                disabled={!!gameState.result}
            />

            {gameState.result && (
                <div className="ttt-result-area">
                    <button className="ttt-reset-btn" onClick={handleReset}>
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}
