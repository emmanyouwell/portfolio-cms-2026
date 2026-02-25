export type Player = 'X' | 'O' | null;

export type GameResult = 'X' | 'O' | 'tie' | null;

export interface GameState {
    board: Player[];
    xIsNext: boolean;
    result: GameResult;
    xScore: number;
    oScore: number;
}

export function calculateWinner(squares: Player[]): GameResult {
    const lines = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // cols
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonals
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a] as GameResult; // 'X' or 'O'
        }
    }

    // Check for tie
    if (!squares.includes(null)) {
        return 'tie';
    }

    return null;
}
