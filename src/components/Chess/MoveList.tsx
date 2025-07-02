import React from 'react';
import { motion } from 'framer-motion';
import { ChessMove } from '../../types/chess';
import { TacticalCard } from '../UI/TacticalCard';

interface MoveListProps {
  moves: ChessMove[];
  currentMoveIndex: number;
  onMoveClick: (index: number) => void;
}

export const MoveList: React.FC<MoveListProps> = ({
  moves,
  currentMoveIndex,
  onMoveClick,
}) => {
  const getMoveClassification = (classification?: string) => {
    const classes = {
      excellent: 'text-tactical-success bg-tactical-success/10',
      good: 'text-blue-400 bg-blue-400/10',
      inaccuracy: 'text-tactical-warning bg-tactical-warning/10',
      mistake: 'text-orange-400 bg-orange-400/10',
      blunder: 'text-tactical-danger bg-tactical-danger/10',
    };
    return classes[classification as keyof typeof classes] || 'text-gray-400 bg-gray-400/10';
  };
  
  const formatEvaluation = (evaluation: number) => {
    if (evaluation > 0) return `+${evaluation.toFixed(1)}`;
    return evaluation.toFixed(1);
  };
  
  return (
    <TacticalCard title="سجل النقلات" subtitle="Move History" className="h-96">
      <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
        {moves.map((move, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200
              ${index === currentMoveIndex 
                ? 'bg-tactical-primary/20 border border-tactical-primary/40' 
                : 'hover:bg-war-light/20'
              }
            `}
            onClick={() => onMoveClick(index)}
          >
            {/* Move Number */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="text-xs text-gray-500 font-mono w-8">
                {Math.ceil((index + 1) / 2)}
                {move.color === 'white' ? '.' : '...'}
              </span>
              
              {/* Move Notation */}
              <span className="font-mono text-white font-medium">
                {move.san}
              </span>
              
              {/* Classification Badge */}
              {move.classification && (
                <span className={`
                  px-2 py-0.5 rounded text-xs font-medium
                  ${getMoveClassification(move.classification)}
                `}>
                  {move.classification}
                </span>
              )}
            </div>
            
            {/* Evaluation */}
            {move.evaluation !== undefined && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className={`
                  text-xs font-mono
                  ${move.evaluation > 0 ? 'text-tactical-success' : 
                    move.evaluation < 0 ? 'text-tactical-danger' : 'text-gray-400'}
                `}>
                  {formatEvaluation(move.evaluation)}
                </span>
                
                {/* Evaluation Bar */}
                <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      move.evaluation > 0 ? 'bg-tactical-success' : 'bg-tactical-danger'
                    }`}
                    style={{ 
                      width: `${Math.min(Math.abs(move.evaluation) * 10, 100)}%`,
                      marginLeft: move.evaluation < 0 ? 'auto' : '0'
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Tactical Footer */}
      <div className="mt-4 pt-4 border-t border-tactical-primary/20">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Total Moves: {moves.length}</span>
          <span className="font-mono">ANALYSIS: ACTIVE</span>
        </div>
      </div>
    </TacticalCard>
  );
};