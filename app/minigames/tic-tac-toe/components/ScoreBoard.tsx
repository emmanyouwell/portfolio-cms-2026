import React from 'react';
import '../styles.css';

interface ScoreBoardProps {
    xScore: number;
    oScore: number;
}

export function ScoreBoard({ xScore, oScore }: ScoreBoardProps) {
    return (
        <div className="ttt-scoreboard">
            <div className="ttt-score">
                <span className="ttt-score-label" style={{ color: '#38bdf8' }}>Player ✖️</span>
                <span className="ttt-score-value">{xScore}</span>
            </div>
            <div className="ttt-score">
                <span className="ttt-score-label" style={{ color: '#f472b6' }}>Player ⭕</span>
                <span className="ttt-score-value">{oScore}</span>
            </div>
        </div>
    );
}
