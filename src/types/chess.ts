export interface ChessGame {
  id: string;
  white: string;
  black: string;
  event: string;
  site: string;
  date: string;
  result: string;
  pgn: string;
  eco: string;
  opening: string;
  moves: ChessMove[];
  analysis?: GameAnalysis;
}

export interface ChessMove {
  san: string;
  fen: string;
  uci: string;
  moveNumber: number;
  color: 'white' | 'black';
  evaluation?: number;
  best?: string;
  classification?: 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  annotations?: string[];
}

export interface GameAnalysis {
  whiteAccuracy: number;
  blackAccuracy: number;
  blunders: number;
  mistakes: number;
  inaccuracies: number;
  keyMoments: KeyMoment[];
  territoryControl: TerritoryData[];
}

export interface KeyMoment {
  moveNumber: number;
  description: string;
  evaluation: number;
  significance: 'critical' | 'important' | 'notable';
}

export interface TerritoryData {
  moveNumber: number;
  whiteControl: number;
  blackControl: number;
  neutralSquares: number;
  whiteSquares: string[];
  blackSquares: string[];
}

export interface Player {
  id: string;
  name: string;
  rating: number;
  country: string;
  playingStyle: PlayingStyle;
  statistics: PlayerStats;
  favoriteOpenings: string[];
}

export interface PlayingStyle {
  aggression: number; // 0-100
  tactical: number;
  positional: number;
  endgame: number;
  opening: number;
  riskTaking: number;
}

export interface PlayerStats {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  averageAccuracy: number;
  blundersPerGame: number;
  averageGameLength: number;
}

export interface Position {
  fen: string;
  evaluation: number;
  bestMove?: string;
  principalVariation?: string[];
}

export interface BattleSession {
  id: string;
  position: string;
  moves: string[];
  userColor: 'white' | 'black';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  status: 'active' | 'completed' | 'abandoned';
  score: number;
  hints: number;
  startTime: Date;
  endTime?: Date;
}