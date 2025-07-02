import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  Upload,
  Activity,
  Target,
  TrendingUp
} from 'lucide-react';
import { ChessBoard } from '../components/Chess/ChessBoard';
import { MoveList } from '../components/Chess/MoveList';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';
import { useGameStore } from '../store/gameStore';
import { ChessGame, ChessMove } from '../types/chess';

// Mock game data
const mockGame: ChessGame = {
  id: '1',
  white: 'Magnus Carlsen',
  black: 'Hikaru Nakamura',
  event: 'World Championship 2023',
  site: 'Dubai, UAE',
  date: '2023.12.15',
  result: '1-0',
  eco: 'C42',
  opening: 'Russian Game: Italian Variation',
  pgn: '1. e4 e5 2. Nf3 Nf6 3. Bc4 Nxe4 4. Re1 Nd6 5. Bxf7+ Kxf7 6. Nxe5+ Kg8',
  moves: [
    { san: 'e4', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1', uci: 'e2e4', moveNumber: 1, color: 'white', evaluation: 0.3, classification: 'good' },
    { san: 'e5', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2', uci: 'e7e5', moveNumber: 1, color: 'black', evaluation: 0.0, classification: 'good' },
    { san: 'Nf3', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', uci: 'g1f3', moveNumber: 2, color: 'white', evaluation: 0.2, classification: 'good' },
    { san: 'Nf6', fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', uci: 'g8f6', moveNumber: 2, color: 'black', evaluation: 0.1, classification: 'good' },
    { san: 'Bc4', fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3', uci: 'f1c4', moveNumber: 3, color: 'white', evaluation: 0.3, classification: 'good' },
    { san: 'Nxe4', fen: 'rnbqkb1r/pppp1ppp/8/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', uci: 'f6e4', moveNumber: 3, color: 'black', evaluation: -0.2, classification: 'inaccuracy' },
  ],
  analysis: {
    whiteAccuracy: 87.5,
    blackAccuracy: 82.1,
    blunders: 0,
    mistakes: 1,
    inaccuracies: 2,
    keyMoments: [
      { moveNumber: 6, description: 'Tactical shot with Nxe5+', evaluation: 1.2, significance: 'critical' }
    ],
    territoryControl: []
  }
};

export const GameViewerPage: React.FC = () => {
  const { 
    currentGame, 
    currentMoveIndex, 
    isAnalyzing,
    setCurrentGame, 
    setCurrentMoveIndex,
    analyzePosition 
  } = useGameStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [evaluation, setEvaluation] = useState(0);
  
  // Load mock game on component mount
  useEffect(() => {
    setCurrentGame(mockGame);
  }, [setCurrentGame]);
  
  // Update position when move index changes
  useEffect(() => {
    if (currentGame && currentGame.moves[currentMoveIndex]) {
      const move = currentGame.moves[currentMoveIndex];
      setPosition(move.fen);
      setEvaluation(move.evaluation || 0);
    }
  }, [currentGame, currentMoveIndex]);
  
  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentGame) {
      interval = setInterval(() => {
        setCurrentMoveIndex(prev => {
          if (prev >= currentGame.moves.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentGame, setCurrentMoveIndex]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handlePrevious = () => {
    setCurrentMoveIndex(Math.max(0, currentMoveIndex - 1));
  };
  
  const handleNext = () => {
    if (currentGame) {
      setCurrentMoveIndex(Math.min(currentGame.moves.length - 1, currentMoveIndex + 1));
    }
  };
  
  const handleReset = () => {
    setCurrentMoveIndex(0);
    setIsPlaying(false);
  };
  
  const handleMoveClick = (index: number) => {
    setCurrentMoveIndex(index);
    setIsPlaying(false);
  };
  
  const formatEvaluation = (evaluation: number) => {
    if (evaluation > 0) return `+${evaluation.toFixed(1)}`;
    return evaluation.toFixed(1);
  };
  
  const getEvaluationColor = (evaluation: number) => {
    if (evaluation > 1) return 'text-tactical-success';
    if (evaluation > 0.5) return 'text-blue-400';
    if (evaluation > -0.5) return 'text-gray-400';
    if (evaluation > -1) return 'text-orange-400';
    return 'text-tactical-danger';
  };
  
  if (!currentGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TacticalCard title="تحميل المباراة" className="text-center">
          <div className="py-8">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-6">لا توجد مباراة محملة</p>
            <TacticalButton icon={Upload}>
              تحميل ملف PGN
            </TacticalButton>
          </div>
        </TacticalCard>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">عارض المباريات التكتيكي</h1>
              <p className="text-gray-400 font-mono">{currentGame.event} - {currentGame.date}</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-war-green">ANALYSIS ACTIVE</span>
            </div>
          </div>
          
          {/* Game Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TacticalCard title="اللاعبون" className="text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">⚪ {currentGame.white}</span>
                  <span className="text-tactical-success font-mono">{currentGame.analysis?.whiteAccuracy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">⚫ {currentGame.black}</span>
                  <span className="text-tactical-success font-mono">{currentGame.analysis?.blackAccuracy}%</span>
                </div>
              </div>
            </TacticalCard>
            
            <TacticalCard title="الافتتاح" className="text-center">
              <div>
                <div className="text-white font-medium mb-1">{currentGame.opening}</div>
                <div className="text-gray-400 font-mono text-sm">{currentGame.eco}</div>
              </div>
            </TacticalCard>
            
            <TacticalCard title="التحليل" className="text-center">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-tactical-danger font-bold">{currentGame.analysis?.blunders}</div>
                  <div className="text-gray-400">أخطاء فادحة</div>
                </div>
                <div>
                  <div className="text-tactical-warning font-bold">{currentGame.analysis?.mistakes}</div>
                  <div className="text-gray-400">أخطاء</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold">{currentGame.analysis?.inaccuracies}</div>
                  <div className="text-gray-400">عدم دقة</div>
                </div>
              </div>
            </TacticalCard>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chess Board */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <ChessBoard
                position={position}
                size={600}
                showCoordinates={true}
                interactive={false}
              />
              
              {/* Controls */}
              <TacticalCard title="التحكم في المباراة">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <TacticalButton
                      variant="ghost"
                      size="sm"
                      icon={RotateCcw}
                      onClick={handleReset}
                    >
                      إعادة تعيين
                    </TacticalButton>
                    <TacticalButton
                      variant="ghost"
                      size="sm"
                      icon={SkipBack}
                      onClick={handlePrevious}
                      disabled={currentMoveIndex === 0}
                    >
                      السابق
                    </TacticalButton>
                    <TacticalButton
                      size="sm"
                      icon={isPlaying ? Pause : Play}
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? 'إيقاف' : 'تشغيل'}
                    </TacticalButton>
                    <TacticalButton
                      variant="ghost"
                      size="sm"
                      icon={SkipForward}
                      onClick={handleNext}
                      disabled={!currentGame || currentMoveIndex >= currentGame.moves.length - 1}
                    >
                      التالي
                    </TacticalButton>
                  </div>
                  
                  {/* Current Evaluation */}
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">تقييم الموقف</div>
                      <div className={`text-lg font-bold font-mono ${getEvaluationColor(evaluation)}`}>
                        {formatEvaluation(evaluation)}
                      </div>
                    </div>
                    <div className="w-12 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          evaluation > 0 ? 'bg-tactical-success' : 'bg-tactical-danger'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs(evaluation) * 20, 100)}%`,
                          marginLeft: evaluation < 0 ? 'auto' : '0'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>النقلة {currentMoveIndex + 1} من {currentGame.moves.length}</span>
                    <span className="font-mono">
                      {Math.round((currentMoveIndex / currentGame.moves.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-tactical-primary to-tactical-success transition-all duration-300"
                      style={{ width: `${(currentMoveIndex / currentGame.moves.length) * 100}%` }}
                    />
                  </div>
                </div>
              </TacticalCard>
            </motion.div>
          </div>
          
          {/* Side Panel */}
          <div className="space-y-6">
            <MoveList
              moves={currentGame.moves}
              currentMoveIndex={currentMoveIndex}
              onMoveClick={handleMoveClick}
            />
            
            {/* Analysis Panel */}
            <TacticalCard title="التحليل المتقدم" icon={Activity}>
              <div className="space-y-4">
                {currentGame.moves[currentMoveIndex] && (
                  <>
                    <div>
                      <div className="text-sm text-gray-400 mb-2">النقلة الحالية</div>
                      <div className="text-white font-mono text-lg">
                        {currentGame.moves[currentMoveIndex].san}
                      </div>
                    </div>
                    
                    {currentGame.moves[currentMoveIndex].best && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">أفضل نقلة</div>
                        <div className="text-tactical-success font-mono">
                          {currentGame.moves[currentMoveIndex].best}
                        </div>
                      </div>
                    )}
                    
                    {currentGame.moves[currentMoveIndex].annotations && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">ملاحظات</div>
                        <div className="text-gray-300 text-sm">
                          {currentGame.moves[currentMoveIndex].annotations?.join(', ')}
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {isAnalyzing && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-war-green">
                    <div className="w-4 h-4 border-2 border-war-green/30 border-t-war-green rounded-full animate-spin"></div>
                    <span className="text-sm font-mono">تحليل الموقف...</span>
                  </div>
                )}
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};