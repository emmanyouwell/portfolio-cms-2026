import React from 'react';
import { Choice, CHOICES, CHOICE_EMOJIS } from '../logic';
import '../styles.css';

interface GameBoardProps {
    onPlay: (choice: Choice) => void;
    disabled: boolean;
}

export function GameBoard({ onPlay, disabled }: GameBoardProps) {
    return (
        <div className="rps-gameboard">
            <div className="rps-choices">
                {CHOICES.map((choice) => (
                    <button
                        key={choice}
                        className="rps-choice-btn"
                        onClick={() => onPlay(choice)}
                        disabled={disabled}
                        aria-label={`Play ${choice}`}
                        title={choice.charAt(0).toUpperCase() + choice.slice(1)}
                    >
                        {CHOICE_EMOJIS[choice]}
                    </button>
                ))}
            </div>
        </div>
    );
}
