import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Swords, 
  Target, 
  Zap, 
  Shield,
  Brain,
  Clock,
  Award,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';
import { ChessBoard } from '../components/Chess/ChessBoard';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';

interface BattleSession {
  id: string;
  position: string;
  moves: string[];
  userColor: 'white' | 'black';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  status: 'setup' | 'active' | 'completed' | 'paused';
  score: number;
  hints: number;
  startTime: Date;
  endTime?: Date;
  aiThinking: boolean;
}

const difficultySettings = {
  easy: { name: 'مبتدئ', elo: 1200, thinkTime: 1000, color: 'text-tactical-success' },
  medium: { name: 'متوسط', elo: 1600, thinkTime: 2000, color: 'text-blue-400' },
  hard: { name: 'صعب', elo: 2000, thinkTime: 3000, color: 'text-tactical-warning' },
  expert: { name: 'خبير', elo: 2400, thinkTime: 5000, color: 'text-tactical-danger' },
};

export const BattleSimulatorPage: React.FC = () => {
  const [battleSession, setBattleSession] = useState<BattleSession>({
    id: '1',
    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: [],
    userColor: 'white',
    difficulty: 'medium',
    status: 'setup',
    score: 0,
    hints: 3,
    startTime: new Date(),
    aiThinking: false,
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<keyof typeof difficultySettings>('medium');
  const [selectedColor, setSelectedColor] = useState<'white' | 'black'>('white');
  const [gameTime, setGameTime] = useState(0);
  const [lastMove, setLastMove] = useState<string>('');
  const [evaluation, setEvaluation] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (battleSession.status === 'active') {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [battleSession.status]);

  const startBattle = () => {
    setBattleSession({
      ...battleSession,
      difficulty: selectedDifficulty,
      userColor: selectedColor,
      status: 'active',
      startTime: new Date(),
    });
    setGameTime(0);
  };

  const pauseBattle = () => {
    setBattleSession({
      ...battleSession,
      status: battleSession.status === 'active' ? 'paused' : 'active',
    });
  };

  const resetBattle = () => {
    setBattleSession({
      id: Date.now().toString(),
      position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      moves: [],
      userColor: selectedColor,
      difficulty: selectedDifficulty,
      status: 'setup',
      score: 0,
      hints: 3,
      startTime: new Date(),
      aiThinking: false,
    });
    setGameTime(0);
    setLastMove('');
    setEvaluation(0);
  };

  const handleMove = async (move: string) => {
    if (battleSession.status !== 'active') return;

    setLastMove(move);
    setBattleSession(prev => ({
      ...prev,
      moves: [...prev.moves, move],
      aiThinking: true,
    }));

    // Simulate AI thinking
    setTimeout(() => {
      const aiMoves = ['e4', 'Nf3', 'Bc4', 'O-O', 'Qh5', 'd4', 'Nc3', 'Re1'];
      const aiMove = aiMoves[Math.floor(Math.random() * aiMoves.length)];
      
      setBattleSession(prev => ({
        ...prev,
        moves: [...prev.moves, aiMove],
        aiThinking: false,
        score: prev.score + Math.floor(Math.random() * 10),
      }));
      
      setEvaluation((Math.random() - 0.5) * 2);
    }, difficultySettings[selectedDifficulty].thinkTime);
  };

  const useHint = () => {
    if (battleSession.hints > 0) {
      setBattleSession(prev => ({
        ...prev,
        hints: prev.hints - 1,
      }));
      // Show hint logic here
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">محاكي المعارك</h1>
              <p className="text-gray-400 font-mono">AI Battle Simulation System</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                battleSession.status === 'active' ? 'bg-war-green' : 
                battleSession.status === 'paused' ? 'bg-tactical-warning' : 'bg-gray-400'
              }`}></div>
              <span className="text-xs font-mono text-war-green">
                {battleSession.status === 'active' ? 'BATTLE ACTIVE' :
                 battleSession.status === 'paused' ? 'PAUSED' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Battle Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TacticalCard title="النتيجة" className="text-center">
              <div className="text-2xl font-bold text-tactical-success">{battleSession.score}</div>
            </TacticalCard>
            <TacticalCard title="الوقت" className="text-center">
              <div className="text-2xl font-bold text-blue-400 font-mono">{formatTime(gameTime)}</div>
            </TacticalCard>
            <TacticalCard title="التلميحات" className="text-center">
              <div className="text-2xl font-bold text-tactical-warning">{battleSession.hints}</div>
            </TacticalCard>
            <TacticalCard title="المستوى" className="text-center">
              <div className={`text-lg font-bold ${difficultySettings[battleSession.difficulty].color}`}>
                {difficultySettings[battleSession.difficulty].name}
              </div>
            </TacticalCard>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Battle Arena */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <TacticalCard title="ساحة المعركة" icon={Swords}>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <ChessBoard
                      position={battleSession.position}
                      size={500}
                      showCoordinates={true}
                      interactive={battleSession.status === 'active' && !battleSession.aiThinking}
                      orientation={battleSession.userColor}
                      onMove={handleMove}
                    />
                  </div>

                  {/* AI Thinking Indicator */}
                  {battleSession.aiThinking && (
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse p-4 bg-tactical-primary/20 rounded-lg">
                      <div className="w-4 h-4 border-2 border-war-green/30 border-t-war-green rounded-full animate-spin"></div>
                      <span className="text-war-green font-mono">AI يفكر...</span>
                    </div>
                  )}

                  {/* Last Move */}
                  {lastMove && (
                    <div className="text-center p-3 bg-war-light/20 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">آخر نقلة</div>
                      <div className="text-white font-mono text-lg">{lastMove}</div>
                    </div>
                  )}
                </div>
              </TacticalCard>
            </motion.div>

            {/* Battle Controls */}
            <TacticalCard title="التحكم في المعركة">
              <div className="space-y-4">
                {battleSession.status === 'setup' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">مستوى الصعوبة</label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value as keyof typeof difficultySettings)}
                        className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                      >
                        {Object.entries(difficultySettings).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.name} (ELO: {value.elo})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">لون القطع</label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value as 'white' | 'black')}
                        className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="white">أبيض</option>
                        <option value="black">أسود</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  {battleSession.status === 'setup' && (
                    <TacticalButton onClick={startBattle} icon={Play} size="lg">
                      بدء المعركة
                    </TacticalButton>
                  )}
                  
                  {(battleSession.status === 'active' || battleSession.status === 'paused') && (
                    <>
                      <TacticalButton
                        onClick={pauseBattle}
                        icon={battleSession.status === 'active' ? Pause : Play}
                        variant="secondary"
                      >
                        {battleSession.status === 'active' ? 'إيقاف مؤقت' : 'استئناف'}
                      </TacticalButton>
                      <TacticalButton onClick={resetBattle} icon={RotateCcw} variant="ghost">
                        إعادة تعيين
                      </TacticalButton>
                      <TacticalButton 
                        onClick={useHint} 
                        icon={Brain} 
                        variant="warning"
                        disabled={battleSession.hints === 0}
                      >
                        تلميح ({battleSession.hints})
                      </TacticalButton>
                    </>
                  )}
                </div>
              </div>
            </TacticalCard>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Current Evaluation */}
            <TacticalCard title="تقييم الموقف" icon={Target}>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold font-mono ${
                    evaluation > 0 ? 'text-tactical-success' :
                    evaluation < 0 ? 'text-tactical-danger' : 'text-gray-400'
                  }`}>
                    {evaluation > 0 ? '+' : ''}{evaluation.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">تقييم الموقف</div>
                </div>

                <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      evaluation > 0 ? 'bg-tactical-success' : 'bg-tactical-danger'
                    }`}
                    style={{ 
                      width: `${Math.min(Math.abs(evaluation) * 30, 100)}%`,
                      marginLeft: evaluation < 0 ? 'auto' : '0'
                    }}
                  />
                </div>

                <div className="text-xs text-gray-400 text-center">
                  {evaluation > 1 ? 'تفوق كبير' :
                   evaluation > 0.5 ? 'تفوق طفيف' :
                   evaluation > -0.5 ? 'متوازن' :
                   evaluation > -1 ? 'وضع صعب' : 'وضع حرج'}
                </div>
              </div>
            </TacticalCard>

            {/* AI Information */}
            <TacticalCard title="معلومات الذكاء الاصطناعي" icon={Brain}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">قوة اللعب</span>
                  <span className="text-white font-mono">{difficultySettings[battleSession.difficulty].elo} ELO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">وقت التفكير</span>
                  <span className="text-white font-mono">{difficultySettings[battleSession.difficulty].thinkTime / 1000}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">النقلات المحللة</span>
                  <span className="text-white font-mono">{battleSession.moves.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">حالة النظام</span>
                  <span className={`font-mono ${
                    battleSession.aiThinking ? 'text-tactical-warning' : 'text-tactical-success'
                  }`}>
                    {battleSession.aiThinking ? 'يحلل' : 'جاهز'}
                  </span>
                </div>
              </div>
            </TacticalCard>

            {/* Battle History */}
            <TacticalCard title="تاريخ المعركة">
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {battleSession.moves.length === 0 ? (
                  <div className="text-center text-gray-400 py-4">
                    لم تبدأ المعركة بعد
                  </div>
                ) : (
                  battleSession.moves.map((move, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-war-light/10 rounded"
                    >
                      <span className="text-xs text-gray-400">
                        {Math.ceil((index + 1) / 2)}.{index % 2 === 0 ? '' : '..'}
                      </span>
                      <span className="text-white font-mono">{move}</span>
                      <span className={`text-xs ${
                        index % 2 === (battleSession.userColor === 'white' ? 0 : 1) 
                          ? 'text-tactical-success' : 'text-blue-400'
                      }`}>
                        {index % 2 === (battleSession.userColor === 'white' ? 0 : 1) ? 'أنت' : 'AI'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </TacticalCard>

            {/* Quick Actions */}
            <TacticalCard title="إجراءات سريعة">
              <div className="space-y-2">
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  حفظ المعركة
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  تحليل الأخطاء
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  مشاركة النتيجة
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};