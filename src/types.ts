export enum DIFFICULTY {
    EASY = 'Fácil',
    MEDIUM = 'Médio',
    HARD = 'Difícil',
}

export type TChampion = {
    id: number;
    name: string;
    img: string;
    attack: number;
    defense: number;
    magic: number;
    difficulty: DIFFICULTY;
};
