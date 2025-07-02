import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Target, 
  Zap, 
  RotateCcw,
  Save,
  Share2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { ChessBoard } from '../components/Chess/ChessBoard';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';
import { useGameStore } from '../store/gameStore';

interface ScenarioComparison {
  id: string;
  name: string;
  originalMove: string;
  alternativeMove: string;
  originalEvaluation: number;
  alternativeEvaluation: number;
  difference: number;
  position: string;
}

export const WhatIfSimulatorPage: React.FC = () => {
  const { currentGame, currentMoveIndex } = useGameStore();
  const [scenarios, setScenarios] = useState<ScenarioComparison[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioComparison | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alternativeMove, setAlternativeMove] = useState('');
  
  // Mock scenario data
  const mockScenarios: ScenarioComparison[] = [
    {
      id: '1',
      name: 'Defense vs Attack',
      originalMove: 'Nf3',
      alternativeMove: 'd4',
      originalEvaluation: 0.2,
      alternativeEvaluation: 0.8,
      difference: 0.6,
      position: 'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 2'
    },
    {
      id: '2',
      name: 'Tactical Shot',
      originalMove: 'O-O',
      alternativeMove: 'Bxf7+',
      originalEvaluation: 0.3,
      alternativeEvaluation: 1.5,
      difference: 1.2,
      position: 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4'
    },
    {
      id: '3',
      name: 'Endgame Precision',
      originalMove: 'Kf1',
      alternativeMove: 'Kg3',
      originalEvaluation: -0.8,
      alternativeEvaluation: 0.0,
      difference: 0.8,
      position: '8/8/8/8/3k4/8/5K2/8 w - - 0 1'
    }
  ];
  
  const createNewScenario = async () => {
    if (!alternativeMove.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newScenario: ScenarioComparison = {
      id: Date.now().toString(),
      name: `Scenario ${scenarios.length + 1}`,
      originalMove: currentGame?.moves[currentMoveIndex]?.san || 'Unknown',
      alternativeMove: alternativeMove,
      originalEvaluation: currentGame?.moves[currentMoveIndex]?.evaluation || 0,
      alternativeEvaluation: Math.random() * 2 - 1, // Random evaluation
      difference: 0,
      position: currentGame?.moves[currentMoveIndex]?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    };
    
    newScenario.difference = newScenario.alternativeEvaluation - newScenario.originalEvaluation;
    
    setScenarios([...scenarios, newScenario]);
    setAlternativeMove('');
    setIsAnalyzing(false);
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
  
  const getImprovementColor = (diff: number) => {
    if (diff > 0.5) return 'text-tactical-success bg-tactical-success/10';
    if (diff > 0) return 'text-blue-400 bg-blue-400/10';
    if (diff > -0.5) return 'text-gray-400 bg-gray-400/10';
    return 'text-tactical-danger bg-tactical-danger/10';
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
              <h1 className="text-3xl font-bold text-white mb-2">محاكي السيناريوهات</h1>
              <p className="text-gray-400 font-mono">What-If Analysis System</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-war-green">SIMULATION MODE</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TacticalCard title="السيناريوهات المحللة" className="text-center">
              <div className="text-2xl font-bold text-tactical-success">{scenarios.length + mockScenarios.length}</div>
            </TacticalCard>
            <TacticalCard title="متوسط التحسين" className="text-center">
              <div className="text-2xl font-bold text-blue-400">+0.65</div>
            </TacticalCard>
            <TacticalCard title="أفضل اختلاف" className="text-center">
              <div className="text-2xl font-bold text-tactical-success">+1.5</div>
            </TacticalCard>
            <TacticalCard title="حالة النظام" className="text-center">
              <div className="text-sm font-bold text-war-green">OPERATIONAL</div>
            </TacticalCard>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Position */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <TacticalCard title="الموقف الحالي" icon={Target}>
                <div className="flex justify-center mb-6">
                  <ChessBoard
                    position={selectedScenario?.position || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
                    size={500}
                    showCoordinates={true}
                    interactive={true}
                  />
                </div>
                
                {selectedScenario && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-war-light/20 rounded-lg">
                      <div className="text-sm text-gray-400 mb-2">النقلة الأصلية</div>
                      <div className="text-white font-mono text-lg mb-2">{selectedScenario.originalMove}</div>
                      <div className={`font-bold ${getEvaluationColor(selectedScenario.originalEvaluation)}`}>
                        {formatEvaluation(selectedScenario.originalEvaluation)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-tactical-primary/20 rounded-lg">
                      <div className="text-sm text-gray-400 mb-2">النقلة البديلة</div>
                      <div className="text-white font-mono text-lg mb-2">{selectedScenario.alternativeMove}</div>
                      <div className={`font-bold ${getEvaluationColor(selectedScenario.alternativeEvaluation)}`}>
                        {formatEvaluation(selectedScenario.alternativeEvaluation)}
                      </div>
                    </div>
                  </div>
                )}
              </TacticalCard>
            </motion.div>
            
            {/* Create New Scenario */}
            <TacticalCard title="إنشاء سيناريو جديد" icon={GitBranch}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    النقلة البديلة
                  </label>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <input
                      type="text"
                      value={alternativeMove}
                      onChange={(e) => setAlternativeMove(e.target.value)}
                      placeholder="مثال: Nf3, d4, Bc4"
                      className="flex-1 bg-war-light/50 border border-tactical-primary/30 rounded-lg px-4 py-2 text-white font-mono focus:border-tactical-primary focus:outline-none"
                    />
                    <TacticalButton
                      onClick={createNewScenario}
                      loading={isAnalyzing}
                      disabled={!alternativeMove.trim()}
                      icon={Zap}
                    >
                      تحليل
                    </TacticalButton>
                  </div>
                </div>
                
                <div className="text-xs text-gray-400">
                  أدخل النقلة البديلة بصيغة الشطرنج القياسية (SAN) لتحليل السيناريو
                </div>
              </div>
            </TacticalCard>
            
            {/* Analysis Results */}
            {selectedScenario && (
              <TacticalCard title="تحليل مفصل" icon={TrendingUp}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-war-light/20 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-400">تحسين التقييم</div>
                      <div className={`text-xl font-bold ${getEvaluationColor(selectedScenario.difference)}`}>
                        {selectedScenario.difference > 0 ? '+' : ''}{selectedScenario.difference.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">التأثير</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded ${getImprovementColor(selectedScenario.difference)}`}>
                        {selectedScenario.difference > 0.5 ? 'تحسن كبير' :
                         selectedScenario.difference > 0 ? 'تحسن طفيف' :
                         selectedScenario.difference > -0.5 ? 'متشابه' : 'أسوأ'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-400">المزايا</div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• تحكم أفضل في المركز</li>
                        <li>• ضغط تكتيكي متزايد</li>
                        <li>• مبادرة أقوى</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-400">المخاطر</div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• ضعف في الموقف الدفاعي</li>
                        <li>• تعقيد أكبر في الحساب</li>
                        <li>• استهلاك وقت إضافي</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <TacticalButton variant="ghost" size="sm" icon={Save}>
                      حفظ التحليل
                    </TacticalButton>
                    <TacticalButton variant="ghost" size="sm" icon={Share2}>
                      مشاركة
                    </TacticalButton>
                  </div>
                </div>
              </TacticalCard>
            )}
          </div>
          
          {/* Scenarios List */}
          <div className="space-y-6">
            <TacticalCard title="السيناريوهات المحفوظة" subtitle={`${mockScenarios.length + scenarios.length} scenarios`}>
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {[...mockScenarios, ...scenarios].map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all duration-200 border
                      ${selectedScenario?.id === scenario.id
                        ? 'bg-tactical-primary/20 border-tactical-primary/40'
                        : 'bg-war-light/10 border-tactical-primary/20 hover:bg-war-light/20'
                      }
                    `}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-white">{scenario.name}</div>
                      <div className={`text-xs px-2 py-1 rounded ${getImprovementColor(scenario.difference)}`}>
                        {scenario.difference > 0 ? '+' : ''}{scenario.difference.toFixed(1)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="space-x-4 rtl:space-x-reverse">
                        <span>{scenario.originalMove}</span>
                        <span>→</span>
                        <span>{scenario.alternativeMove}</span>
                      </div>
                      
                      {scenario.difference > 0.5 && (
                        <AlertTriangle className="w-3 h-3 text-tactical-success" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-tactical-primary/20">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>انقر لعرض التحليل</span>
                  <TacticalButton variant="ghost" size="sm" icon={RotateCcw}>
                    مسح الكل
                  </TacticalButton>
                </div>
              </div>
            </TacticalCard>
            
            {/* Quick Actions */}
            <TacticalCard title="إجراءات سريعة">
              <div className="space-y-3">
                <TacticalButton className="w-full" variant="ghost">
                  تحليل موقف عشوائي
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost">
                  استيراد موقف من FEN
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost">
                  تصدير النتائج
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};