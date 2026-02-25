import React from 'react';
import { Player } from '../logic';
import '../styles.css';

interface BoardProps {
    squares: Player[];
    onClick: (i: number) => void;
    disabled: boolean;
}

export function Board({ squares, onClick, disabled }: BoardProps) {
    return (
        <div className="ttt-board">
            {squares.map((square, i) => (
                <button
                    key={i}
                    className={`ttt-cell ${square === 'X' ? 'ttt-x' : ''} ${square === 'O' ? 'ttt-o' : ''}`}
                    onClick={() => onClick(i)}
                    disabled={disabled || square !== null}
                    aria-label={square ? `Square occupied by ${square}` : `Empty square ${i}`}
                >
                    {square === 'X' ? '✖️' : square === 'O' ? '⭕' : ''}
                </button>
            ))}
        </div>
    );
}
