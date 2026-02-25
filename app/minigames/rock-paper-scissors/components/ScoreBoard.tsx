import React from 'react';
import '../styles.css';

interface ScoreBoardProps {
    playerScore: number;
    computerScore: number;
}

export function ScoreBoard({ playerScore, computerScore }: ScoreBoardProps) {
    return (
        <div className="rps-scoreboard">
            <div className="rps-score">
                <span className="rps-score-label">Player</span>
                <span className="rps-score-value">{playerScore}</span>
            </div>
            <div className="rps-score">
                <span className="rps-score-label">Computer</span>
                <span className="rps-score-value">{computerScore}</span>
            </div>
        </div>
    );
}
