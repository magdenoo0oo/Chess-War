import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Target, 
  BarChart3, 
  TrendingDown,
  AlertTriangle,
  Eye,
  Filter,
  Download
} from 'lucide-react';
import { ChessBoard } from '../components/Chess/ChessBoard';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface BlunderData {
  square: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  commonMistakes: string[];
  averageEloLoss: number;
}

interface BlunderStats {
  totalBlunders: number;
  mostCommonSquare: string;
  averageEloLoss: number;
  blundersByPhase: { phase: string; count: number; color: string }[];
  blundersByPiece: { piece: string; count: number; color: string }[];
}

const mockBlunderData: BlunderData[] = [
  { square: 'e4', frequency: 45, severity: 'high', commonMistakes: ['Premature attack', 'Weak square creation'], averageEloLoss: 120 },
  { square: 'd4', frequency: 38, severity: 'medium', commonMistakes: ['Pawn structure damage', 'King safety'], averageEloLoss: 95 },
  { square: 'f7', frequency: 52, severity: 'critical', commonMistakes: ['Mate threats', 'Tactical shots'], averageEloLoss: 180 },
  { square: 'h7', frequency: 41, severity: 'high', commonMistakes: ['Back rank weakness', 'King exposure'], averageEloLoss: 135 },
  { square: 'c4', frequency: 29, severity: 'medium', commonMistakes: ['Positional errors', 'Piece coordination'], averageEloLoss: 85 },
  { square: 'g6', frequency: 33, severity: 'medium', commonMistakes: ['King safety', 'Pawn storms'], averageEloLoss: 110 },
  { square: 'b7', frequency: 25, severity: 'low', commonMistakes: ['Development issues', 'Time loss'], averageEloLoss: 65 },
  { square: 'a6', frequency: 22, severity: 'low', commonMistakes: ['Unnecessary moves', 'Tempo loss'], averageEloLoss: 55 },
];

const mockStats: BlunderStats = {
  totalBlunders: 1247,
  mostCommonSquare: 'f7',
  averageEloLoss: 105,
  blundersByPhase: [
    { phase: 'الافتتاح', count: 234, color: '#10b981' },
    { phase: 'الوسط', count: 567, color: '#f59e0b' },
    { phase: 'النهاية', count: 446, color: '#dc2626' },
  ],
  blundersByPiece: [
    { piece: 'البيدق', count: 345, color: '#10b981' },
    { piece: 'الحصان', count: 289, color: '#3b82f6' },
    { piece: 'الفيل', count: 234, color: '#8b5cf6' },
    { piece: 'القلعة', count: 198, color: '#f59e0b' },
    { piece: 'الملكة', count: 156, color: '#dc2626' },
    { piece: 'الملك', count: 25, color: '#6b7280' },
  ],
};

export const HeatmapPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'opening' | 'middlegame' | 'endgame'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [showDetails, setShowDetails] = useState(false);

  const getSquareHighlights = () => {
    const highlights: { [square: string]: { backgroundColor: string } } = {};
    
    mockBlunderData.forEach(data => {
      if (selectedSeverity === 'all' || data.severity === selectedSeverity) {
        const intensity = Math.min(data.frequency / 60, 1);
        const severityColors = {
          low: `rgba(59, 130, 246, ${intensity})`,
          medium: `rgba(245, 158, 11, ${intensity})`,
          high: `rgba(239, 68, 68, ${intensity})`,
          critical: `rgba(220, 38, 38, ${intensity})`,
        };
        highlights[data.square] = { backgroundColor: severityColors[data.severity] };
      }
    });
    
    return highlights;
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      medium: 'text-tactical-warning bg-tactical-warning/10 border-tactical-warning/20',
      high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      critical: 'text-tactical-danger bg-tactical-danger/10 border-tactical-danger/20',
    };
    return colors[severity as keyof typeof colors] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  };

  const getSeverityLabel = (severity: string) => {
    const labels = {
      low: 'منخفض',
      medium: 'متوسط',
      high: 'عالي',
      critical: 'حرج',
    };
    return labels[severity as keyof typeof labels] || severity;
  };

  const filteredData = mockBlunderData.filter(data => 
    selectedSeverity === 'all' || data.severity === selectedSeverity
  );

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
              <h1 className="text-3xl font-bold text-white mb-2">خريطة الأخطاء الحرارية</h1>
              <p className="text-gray-400 font-mono">Global Blunder Analysis System</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-tactical-danger rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-tactical-danger">HEATMAP ACTIVE</span>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TacticalCard title="إجمالي الأخطاء" className="text-center">
              <div className="text-2xl font-bold text-tactical-danger">{mockStats.totalBlunders}</div>
            </TacticalCard>
            <TacticalCard title="أكثر المربعات خطورة" className="text-center">
              <div className="text-2xl font-bold text-tactical-warning">{mockStats.mostCommonSquare}</div>
            </TacticalCard>
            <TacticalCard title="متوسط فقدان النقاط" className="text-center">
              <div className="text-2xl font-bold text-orange-400">{mockStats.averageEloLoss}</div>
            </TacticalCard>
            <TacticalCard title="معدل التحليل" className="text-center">
              <div className="text-lg font-bold text-war-green">98.7%</div>
            </TacticalCard>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Heatmap Board */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <TacticalCard title="خريطة الأخطاء الحرارية" icon={Flame}>
                <div className="space-y-4">
                  {/* Filter Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <select
                        value={selectedSeverity}
                        onChange={(e) => setSelectedSeverity(e.target.value as any)}
                        className="bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-1 text-white text-sm"
                      >
                        <option value="all">جميع المستويات</option>
                        <option value="low">منخفض</option>
                        <option value="medium">متوسط</option>
                        <option value="high">عالي</option>
                        <option value="critical">حرج</option>
                      </select>
                      
                      <TacticalButton
                        size="sm"
                        variant="ghost"
                        icon={Eye}
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        {showDetails ? 'إخفاء' : 'إظهار'} التفاصيل
                      </TacticalButton>
                    </div>

                    <TacticalButton size="sm" variant="ghost" icon={Download}>
                      تصدير البيانات
                    </TacticalButton>
                  </div>

                  <div className="flex justify-center">
                    <ChessBoard
                      position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                      size={500}
                      showCoordinates={true}
                      interactive={false}
                      highlightSquares={getSquareHighlights()}
                    />
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-blue-400 rounded"></div>
                      <span>منخفض</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-tactical-warning rounded"></div>
                      <span>متوسط</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-orange-400 rounded"></div>
                      <span>عالي</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-tactical-danger rounded"></div>
                      <span>حرج</span>
                    </div>
                  </div>
                </div>
              </TacticalCard>
            </motion.div>

            {/* Analysis Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TacticalCard title="الأخطاء حسب مرحلة اللعب" icon={BarChart3}>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockStats.blundersByPhase}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="count"
                        nameKey="phase"
                      >
                        {mockStats.blundersByPhase.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #1a4d3a',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TacticalCard>

              <TacticalCard title="الأخطاء حسب القطعة" icon={Target}>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockStats.blundersByPiece}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a4d3a" opacity={0.3} />
                      <XAxis dataKey="piece" stroke="#9ca3af" fontSize={10} />
                      <YAxis stroke="#9ca3af" fontSize={10} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #1a4d3a',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                      <Bar dataKey="count" fill="#dc2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TacticalCard>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Hot Spots */}
            <TacticalCard title="النقاط الساخنة" icon={AlertTriangle}>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {filteredData
                  .sort((a, b) => b.frequency - a.frequency)
                  .slice(0, 8)
                  .map((data, index) => (
                    <div
                      key={data.square}
                      className="p-3 bg-war-light/10 rounded-lg border border-tactical-primary/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-white font-mono text-lg">{data.square}</span>
                          <span className={`px-2 py-1 rounded text-xs border ${getSeverityColor(data.severity)}`}>
                            {getSeverityLabel(data.severity)}
                          </span>
                        </div>
                        <span className="text-tactical-danger font-bold">{data.frequency}</span>
                      </div>
                      
                      <div className="text-xs text-gray-400 mb-2">
                        فقدان متوسط: {data.averageEloLoss} نقطة
                      </div>
                      
                      {showDetails && (
                        <div className="text-xs text-gray-300">
                          <div className="font-medium mb-1">الأخطاء الشائعة:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {data.commonMistakes.map((mistake, idx) => (
                              <li key={idx}>{mistake}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </TacticalCard>

            {/* Severity Distribution */}
            <TacticalCard title="توزيع الخطورة">
              <div className="space-y-3">
                {['critical', 'high', 'medium', 'low'].map(severity => {
                  const count = mockBlunderData.filter(d => d.severity === severity).length;
                  const percentage = (count / mockBlunderData.length) * 100;
                  
                  return (
                    <div key={severity} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{getSeverityLabel(severity)}</span>
                        <span className="text-white font-mono">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            severity === 'critical' ? 'bg-tactical-danger' :
                            severity === 'high' ? 'bg-orange-400' :
                            severity === 'medium' ? 'bg-tactical-warning' : 'bg-blue-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </TacticalCard>

            {/* Recommendations */}
            <TacticalCard title="توصيات تكتيكية" icon={TrendingDown}>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-tactical-danger/10 rounded-lg border border-tactical-danger/20">
                  <div className="text-tactical-danger font-medium mb-1">تحذير عالي</div>
                  <div className="text-gray-300">تجنب النقلات المتسرعة في المربع f7</div>
                </div>
                
                <div className="p-3 bg-tactical-warning/10 rounded-lg border border-tactical-warning/20">
                  <div className="text-tactical-warning font-medium mb-1">انتبه</div>
                  <div className="text-gray-300">راجع أمان الملك في المربعات المركزية</div>
                </div>
                
                <div className="p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
                  <div className="text-blue-400 font-medium mb-1">نصيحة</div>
                  <div className="text-gray-300">احسب التكتيكات بعناية في الوسط</div>
                </div>
              </div>
            </TacticalCard>

            {/* Quick Actions */}
            <TacticalCard title="إجراءات سريعة">
              <div className="space-y-2">
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  تحليل مخصص
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  مقارنة مع لاعب
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  تصدير التقرير
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};