import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Target, 
  Activity, 
  Layers,
  BarChart3,
  TrendingUp,
  Eye,
  Crosshair
} from 'lucide-react';
import { ChessBoard } from '../components/Chess/ChessBoard';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface TerritoryData {
  move: number;
  whiteControl: number;
  blackControl: number;
  neutral: number;
}

interface SquareControl {
  square: string;
  whiteInfluence: number;
  blackInfluence: number;
  control: 'white' | 'black' | 'neutral';
}

const mockTerritoryData: TerritoryData[] = [
  { move: 1, whiteControl: 35, blackControl: 35, neutral: 30 },
  { move: 2, whiteControl: 40, blackControl: 32, neutral: 28 },
  { move: 3, whiteControl: 38, blackControl: 38, neutral: 24 },
  { move: 4, whiteControl: 45, blackControl: 35, neutral: 20 },
  { move: 5, whiteControl: 42, blackControl: 40, neutral: 18 },
  { move: 6, whiteControl: 48, blackControl: 35, neutral: 17 },
  { move: 7, whiteControl: 44, blackControl: 42, neutral: 14 },
  { move: 8, whiteControl: 50, blackControl: 38, neutral: 12 },
  { move: 9, whiteControl: 47, blackControl: 43, neutral: 10 },
  { move: 10, whiteControl: 52, blackControl: 40, neutral: 8 },
];

const mockSquareData: SquareControl[] = [
  { square: 'e4', whiteInfluence: 80, blackInfluence: 20, control: 'white' },
  { square: 'd4', whiteInfluence: 75, blackInfluence: 25, control: 'white' },
  { square: 'e5', whiteInfluence: 30, blackInfluence: 70, control: 'black' },
  { square: 'd5', whiteInfluence: 25, blackInfluence: 75, control: 'black' },
  { square: 'c4', whiteInfluence: 60, blackInfluence: 40, control: 'white' },
  { square: 'f4', whiteInfluence: 55, blackInfluence: 45, control: 'white' },
  { square: 'c5', whiteInfluence: 35, blackInfluence: 65, control: 'black' },
  { square: 'f5', whiteInfluence: 40, blackInfluence: 60, control: 'black' },
];

export const TerritoryControlPage: React.FC = () => {
  const [currentMove, setCurrentMove] = useState(10);
  const [viewMode, setViewMode] = useState<'heatmap' | 'influence' | 'tactical'>('heatmap');
  const [showAnalysis, setShowAnalysis] = useState(true);
  
  const currentData = mockTerritoryData[currentMove - 1] || mockTerritoryData[0];
  
  const getSquareHighlights = () => {
    const highlights: { [square: string]: { backgroundColor: string } } = {};
    
    mockSquareData.forEach(sq => {
      if (viewMode === 'heatmap') {
        const intensity = Math.max(sq.whiteInfluence, sq.blackInfluence) / 100;
        if (sq.control === 'white') {
          highlights[sq.square] = { backgroundColor: `rgba(16, 185, 129, ${intensity * 0.8})` };
        } else if (sq.control === 'black') {
          highlights[sq.square] = { backgroundColor: `rgba(220, 38, 38, ${intensity * 0.8})` };
        }
      } else if (viewMode === 'influence') {
        const diff = sq.whiteInfluence - sq.blackInfluence;
        const intensity = Math.abs(diff) / 100;
        if (diff > 0) {
          highlights[sq.square] = { backgroundColor: `rgba(26, 77, 58, ${intensity})` };
        } else {
          highlights[sq.square] = { backgroundColor: `rgba(77, 26, 26, ${intensity})` };
        }
      } else if (viewMode === 'tactical') {
        if (sq.whiteInfluence > 70 || sq.blackInfluence > 70) {
          highlights[sq.square] = { backgroundColor: 'rgba(251, 191, 36, 0.6)' };
        }
      }
    });
    
    return highlights;
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
              <h1 className="text-3xl font-bold text-white mb-2">خريطة السيطرة التكتيكية</h1>
              <p className="text-gray-400 font-mono">Territory Control Analysis System</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-war-green">RADAR ACTIVE</span>
            </div>
          </div>
          
          {/* Control Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TacticalCard title="السيطرة البيضاء" className="text-center">
              <div className="text-2xl font-bold text-tactical-success">
                {currentData.whiteControl}%
              </div>
            </TacticalCard>
            <TacticalCard title="السيطرة السوداء" className="text-center">
              <div className="text-2xl font-bold text-tactical-danger">
                {currentData.blackControl}%
              </div>
            </TacticalCard>
            <TacticalCard title="المناطق المحايدة" className="text-center">
              <div className="text-2xl font-bold text-gray-400">
                {currentData.neutral}%
              </div>
            </TacticalCard>
            <TacticalCard title="النقلة الحالية" className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {currentMove}
              </div>
            </TacticalCard>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Board */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <TacticalCard title="لوحة السيطرة الديناميكية" icon={Map}>
                <div className="space-y-4">
                  {/* View Mode Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <TacticalButton
                        size="sm"
                        variant={viewMode === 'heatmap' ? 'primary' : 'ghost'}
                        onClick={() => setViewMode('heatmap')}
                      >
                        خريطة حرارية
                      </TacticalButton>
                      <TacticalButton
                        size="sm"
                        variant={viewMode === 'influence' ? 'primary' : 'ghost'}
                        onClick={() => setViewMode('influence')}
                      >
                        النفوذ
                      </TacticalButton>
                      <TacticalButton
                        size="sm"
                        variant={viewMode === 'tactical' ? 'primary' : 'ghost'}
                        onClick={() => setViewMode('tactical')}
                      >
                        التكتيكي
                      </TacticalButton>
                    </div>
                    
                    <TacticalButton
                      size="sm"
                      variant="ghost"
                      icon={Eye}
                      onClick={() => setShowAnalysis(!showAnalysis)}
                    >
                      {showAnalysis ? 'إخفاء' : 'إظهار'} التحليل
                    </TacticalButton>
                  </div>
                  
                  <div className="flex justify-center">
                    <ChessBoard
                      position="rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4"
                      size={500}
                      showCoordinates={true}
                      interactive={false}
                      highlightSquares={getSquareHighlights()}
                    />
                  </div>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <div className="w-4 h-4 bg-tactical-success rounded"></div>
                      <span>سيطرة بيضاء</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <div className="w-4 h-4 bg-tactical-danger rounded"></div>
                      <span>سيطرة سوداء</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <div className="w-4 h-4 bg-gray-400 rounded"></div>
                      <span>منطقة محايدة</span>
                    </div>
                  </div>
                </div>
              </TacticalCard>
            </motion.div>
            
            {/* Territory Evolution Chart */}
            <TacticalCard title="تطور السيطرة" icon={TrendingUp}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTerritoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a4d3a" opacity={0.3} />
                    <XAxis 
                      dataKey="move" 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #1a4d3a',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="whiteControl"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="blackControl"
                      stackId="1"
                      stroke="#dc2626"
                      fill="#dc2626"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="neutral"
                      stackId="1"
                      stroke="#6b7280"
                      fill="#6b7280"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TacticalCard>
            
            {/* Move Timeline */}
            <TacticalCard title="الجدول الزمني للنقلات">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">النقلة: {currentMove} / 10</span>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <TacticalButton 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setCurrentMove(Math.max(1, currentMove - 1))}
                      disabled={currentMove === 1}
                    >
                      السابق
                    </TacticalButton>
                    <TacticalButton 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setCurrentMove(Math.min(10, currentMove + 1))}
                      disabled={currentMove === 10}
                    >
                      التالي
                    </TacticalButton>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-tactical-primary to-tactical-success transition-all duration-300"
                    style={{ width: `${(currentMove / 10) * 100}%` }}
                  />
                </div>
              </div>
            </TacticalCard>
          </div>
          
          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Current Analysis */}
            <TacticalCard title="التحليل الحالي" icon={Activity}>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">ميزان القوى</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white">الأبيض</span>
                      <span className="text-tactical-success font-mono">
                        {currentData.whiteControl}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-tactical-success transition-all duration-300"
                        style={{ width: `${currentData.whiteControl}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">الأسود</span>
                      <span className="text-tactical-danger font-mono">
                        {currentData.blackControl}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-tactical-danger transition-all duration-300"
                        style={{ width: `${currentData.blackControl}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-tactical-primary/20 pt-4">
                  <div className="text-sm text-gray-400 mb-2">تقييم الموقف</div>
                  <div className={`text-lg font-bold ${
                    currentData.whiteControl > currentData.blackControl 
                      ? 'text-tactical-success' 
                      : currentData.blackControl > currentData.whiteControl
                      ? 'text-tactical-danger'
                      : 'text-gray-400'
                  }`}>
                    {currentData.whiteControl > currentData.blackControl 
                      ? 'تفوق أبيض' 
                      : currentData.blackControl > currentData.whiteControl
                      ? 'تفوق أسود'
                      : 'متوازن'
                    }
                  </div>
                </div>
              </div>
            </TacticalCard>
            
            {/* Hot Zones */}
            <TacticalCard title="المناطق الساخنة" icon={Target}>
              <div className="space-y-3">
                {mockSquareData.slice(0, 6).map((square, index) => (
                  <div
                    key={square.square}
                    className="flex items-center justify-between p-2 bg-war-light/10 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className={`w-3 h-3 rounded-full ${
                        square.control === 'white' ? 'bg-tactical-success' :
                        square.control === 'black' ? 'bg-tactical-danger' : 'bg-gray-400'
                      }`}></div>
                      <span className="font-mono text-white">{square.square}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {Math.max(square.whiteInfluence, square.blackInfluence)}%
                    </div>
                  </div>
                ))}
              </div>
            </TacticalCard>
            
            {/* Strategic Insights */}
            <TacticalCard title="رؤى استراتيجية" icon={Crosshair}>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-tactical-success/10 rounded-lg border border-tactical-success/20">
                  <div className="text-tactical-success font-medium mb-1">مبادرة قوية</div>
                  <div className="text-gray-300">الأبيض يسيطر على المركز بشكل مؤثر</div>
                </div>
                
                <div className="p-3 bg-tactical-warning/10 rounded-lg border border-tactical-warning/20">
                  <div className="text-tactical-warning font-medium mb-1">ضغط جانبي</div>
                  <div className="text-gray-300">الأسود يبني هجمة على الجناح الملكي</div>
                </div>
                
                <div className="p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
                  <div className="text-blue-400 font-medium mb-1">توصية تكتيكية</div>
                  <div className="text-gray-300">يُنصح بتعزيز السيطرة على المربعات الحاسمة</div>
                </div>
              </div>
            </TacticalCard>
            
            {/* Quick Actions */}
            <TacticalCard title="إجراءات سريعة">
              <div className="space-y-2">
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  تصدير خريطة السيطرة
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  مقارنة مع مباراة أخرى
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  حفظ التحليل
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};