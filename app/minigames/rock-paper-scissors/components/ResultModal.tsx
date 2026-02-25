import React from 'react';
import { Choice, GameResult, CHOICE_EMOJIS } from '../logic';
import '../styles.css';
import { trackEvent } from '@/lib/gtag';

interface ResultModalProps {
    result: GameResult;
    playerChoice: Choice | null;
    computerChoice: Choice | null;
    onReset: () => void;
}

export function ResultModal({ result, playerChoice, computerChoice, onReset }: ResultModalProps) {
    if (!result || !playerChoice || !computerChoice) return <div className="rps-result-area" />;
    trackEvent("game_interaction", { interaction_type: "play_again", game_name: "rock_paper_scissors", source: "rock_paper_scissors_page" });
    const getResultText = () => {
        switch (result) {
            case 'win': return { text: 'You Win!', className: 'rps-win' };
            case 'lose': return { text: 'You Lose!', className: 'rps-lose' };
            case 'tie': return { text: "It's a Tie!", className: 'rps-tie' };
            default: return { text: '', className: '' };
        }
    };

    const { text, className } = getResultText();

    return (
        <div className="rps-result-area">
            <div className={`rps-result-text ${className}`}>{text}</div>
            <div className="rps-choices-display">
                <span className="text-4xl">{CHOICE_EMOJIS[playerChoice]}</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.6 }}>vs</span>
                <span className="text-4xl">{CHOICE_EMOJIS[computerChoice]}</span>
            </div>
            <button className="rps-reset-btn" onClick={onReset}>
                Play Again
            </button>
        </div>
    );
}
