import { create } from 'zustand';
import { ChessGame, ChessMove, Player, BattleSession, TerritoryData } from '../types/chess';

interface GameState {
  // Current game data
  currentGame: ChessGame | null;
  currentMoveIndex: number;
  isAnalyzing: boolean;
  
  // Games database
  games: ChessGame[];
  players: Player[];
  
  // Battle simulator
  battleSession: BattleSession | null;
  
  // Territory analysis
  territoryData: TerritoryData[];
  
  // UI state
  selectedSquares: string[];
  highlightedSquares: { [square: string]: string };
  showAnalysis: boolean;
  
  // Actions
  setCurrentGame: (game: ChessGame | null) => void;
  setCurrentMoveIndex: (index: number) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  addGame: (game: ChessGame) => void;
  updateGame: (gameId: string, updates: Partial<ChessGame>) => void;
  deleteGame: (gameId: string) => void;
  addPlayer: (player: Player) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  setBattleSession: (session: BattleSession | null) => void;
  setTerritoryData: (data: TerritoryData[]) => void;
  setSelectedSquares: (squares: string[]) => void;
  setHighlightedSquares: (squares: { [square: string]: string }) => void;
  setShowAnalysis: (show: boolean) => void;
  
  // Analysis functions
  analyzePosition: (fen: string) => Promise<number>;
  findBestMove: (fen: string) => Promise<string>;
  calculateTerritoryControl: (fen: string) => TerritoryData;
}

// Mock Stockfish analysis function
const mockStockfishAnalysis = async (fen: string): Promise<{ evaluation: number; bestMove: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Mock evaluation (-10 to +10, where positive is better for white)
  const evaluation = (Math.random() - 0.5) * 20;
  
  // Mock best move
  const moves = ['e4', 'Nf3', 'Bc4', 'O-O', 'Qh5', 'd4', 'Nc3', 'Re1'];
  const bestMove = moves[Math.floor(Math.random() * moves.length)];
  
  return { evaluation, bestMove };
};

// Mock territory calculation
const calculateMockTerritory = (fen: string): TerritoryData => {
  const whiteControl = Math.floor(Math.random() * 40) + 20;
  const blackControl = Math.floor(Math.random() * 40) + 20;
  const neutralSquares = 64 - whiteControl - blackControl;
  
  return {
    moveNumber: 1,
    whiteControl,
    blackControl,
    neutralSquares,
    whiteSquares: [],
    blackSquares: [],
  };
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  currentGame: null,
  currentMoveIndex: 0,
  isAnalyzing: false,
  games: [],
  players: [],
  battleSession: null,
  territoryData: [],
  selectedSquares: [],
  highlightedSquares: {},
  showAnalysis: true,
  
  // Actions
  setCurrentGame: (game) => set({ currentGame: game, currentMoveIndex: 0 }),
  setCurrentMoveIndex: (index) => set({ currentMoveIndex: index }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  addGame: (game) => set((state) => ({ 
    games: [...state.games, game] 
  })),
  
  updateGame: (gameId, updates) => set((state) => ({
    games: state.games.map(game => 
      game.id === gameId ? { ...game, ...updates } : game
    )
  })),
  
  deleteGame: (gameId) => set((state) => ({
    games: state.games.filter(game => game.id !== gameId)
  })),
  
  addPlayer: (player) => set((state) => ({ 
    players: [...state.players, player] 
  })),
  
  updatePlayer: (playerId, updates) => set((state) => ({
    players: state.players.map(player => 
      player.id === playerId ? { ...player, ...updates } : player
    )
  })),
  
  setBattleSession: (session) => set({ battleSession: session }),
  setTerritoryData: (data) => set({ territoryData: data }),
  setSelectedSquares: (squares) => set({ selectedSquares: squares }),
  setHighlightedSquares: (squares) => set({ highlightedSquares: squares }),
  setShowAnalysis: (show) => set({ showAnalysis: show }),
  
  // Analysis functions
  analyzePosition: async (fen: string) => {
    set({ isAnalyzing: true });
    try {
      const result = await mockStockfishAnalysis(fen);
      return result.evaluation;
    } finally {
      set({ isAnalyzing: false });
    }
  },
  
  findBestMove: async (fen: string) => {
    const result = await mockStockfishAnalysis(fen);
    return result.bestMove;
  },
  
  calculateTerritoryControl: (fen: string) => {
    return calculateMockTerritory(fen);
  },
}));