export type Choice = 'rock' | 'paper' | 'scissors';

export type GameResult = 'win' | 'lose' | 'tie' | null;

export interface GameState {
    playerScore: number;
    computerScore: number;
    playerChoice: Choice | null;
    computerChoice: Choice | null;
    result: GameResult;
    roundCount: number;
}

export const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

export const CHOICE_EMOJIS: Record<Choice, string> = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️',
};

export function getRandomChoice(): Choice {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

export function determineWinner(playerChoice: Choice, computerChoice: Choice): GameResult {
    if (playerChoice === computerChoice) {
        return 'tie';
    }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}
