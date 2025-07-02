import React, { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

interface ChessBoardProps {
  position?: string;
  onMove?: (move: string) => void;
  showCoordinates?: boolean;
  interactive?: boolean;
  size?: number;
  orientation?: 'white' | 'black';
  highlightSquares?: { [square: string]: string };
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  onMove,
  showCoordinates = true,
  interactive = true,
  size = 400,
  orientation = 'white',
  highlightSquares = {},
}) => {
  const [game] = useState(new Chess(position));
  const { setSelectedSquares, setHighlightedSquares } = useGameStore();
  
  const onPieceDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });
      
      if (move) {
        onMove?.(move.san);
        setSelectedSquares([sourceSquare, targetSquare]);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, [game, onMove, setSelectedSquares]);
  
  const onSquareClick = useCallback((square: string) => {
    const piece = game.get(square);
    if (piece) {
      const moves = game.moves({ square, verbose: true });
      const highlights: { [square: string]: string } = {};
      
      moves.forEach(move => {
        highlights[move.to] = 'rgba(26, 77, 58, 0.4)';
      });
      
      setHighlightedSquares(highlights);
    }
  }, [game, setHighlightedSquares]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative chess-board-container"
    >
      {/* Tactical Frame */}
      <div className="absolute -inset-2 bg-gradient-to-br from-tactical-primary/20 via-transparent to-tactical-secondary/20 rounded-xl blur-sm"></div>
      <div className="absolute -inset-1 bg-war-gray border border-tactical-primary/30 rounded-lg"></div>
      
      {/* Chess Board */}
      <div className="relative bg-war-dark p-2 rounded-lg">
        <Chessboard
          position={position}
          onPieceDrop={interactive ? onPieceDrop : undefined}
          onSquareClick={interactive ? onSquareClick : undefined}
          boardWidth={size}
          boardOrientation={orientation}
          showBoardNotation={showCoordinates}
          customBoardStyle={{
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(26, 77, 58, 0.3)',
          }}
          customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
          customDarkSquareStyle={{ backgroundColor: '#b58863' }}
          customSquareStyles={{
            ...highlightSquares,
          }}
        />
        
        {/* Coordinate System Enhancement */}
        {showCoordinates && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-2 border border-tactical-primary/10 rounded-lg"></div>
          </div>
        )}
      </div>
      
      {/* Status Indicators */}
      <div className="absolute -top-8 left-0 flex items-center space-x-2 rtl:space-x-reverse">
        <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400 font-mono">TACTICAL ANALYSIS ACTIVE</span>
      </div>
    </motion.div>
  );
};