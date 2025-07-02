import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  BarChart3,
  Award,
  Zap,
  Shield,
  Swords,
  Brain,
  Clock
} from 'lucide-react';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PlayerProfile {
  id: string;
  name: string;
  rating: number;
  country: string;
  avatar: string;
  playingStyle: {
    aggression: number;
    tactical: number;
    positional: number;
    endgame: number;
    opening: number;
    riskTaking: number;
  };
  statistics: {
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    averageAccuracy: number;
    blundersPerGame: number;
    averageGameLength: number;
  };
  favoriteOpenings: string[];
  recentPerformance: { month: string; rating: number; accuracy: number }[];
}

const mockPlayers: PlayerProfile[] = [
  {
    id: '1',
    name: 'Magnus Carlsen',
    rating: 2830,
    country: 'Norway',
    avatar: '👑',
    playingStyle: {
      aggression: 75,
      tactical: 95,
      positional: 98,
      endgame: 99,
      opening: 90,
      riskTaking: 60,
    },
    statistics: {
      totalGames: 2847,
      wins: 1892,
      losses: 234,
      draws: 721,
      averageAccuracy: 94.2,
      blundersPerGame: 0.12,
      averageGameLength: 42,
    },
    favoriteOpenings: ['Ruy Lopez', 'Queen\'s Gambit', 'English Opening'],
    recentPerformance: [
      { month: 'Jan', rating: 2820, accuracy: 93.5 },
      { month: 'Feb', rating: 2825, accuracy: 94.1 },
      { month: 'Mar', rating: 2830, accuracy: 94.8 },
      { month: 'Apr', rating: 2828, accuracy: 93.9 },
      { month: 'May', rating: 2830, accuracy: 94.2 },
    ]
  },
  {
    id: '2',
    name: 'Hikaru Nakamura',
    rating: 2780,
    country: 'USA',
    avatar: '⚡',
    playingStyle: {
      aggression: 85,
      tactical: 92,
      positional: 85,
      endgame: 88,
      opening: 95,
      riskTaking: 80,
    },
    statistics: {
      totalGames: 3124,
      wins: 2156,
      losses: 312,
      draws: 656,
      averageAccuracy: 91.8,
      blundersPerGame: 0.18,
      averageGameLength: 38,
    },
    favoriteOpenings: ['Sicilian Defense', 'King\'s Indian', 'Nimzo-Indian'],
    recentPerformance: [
      { month: 'Jan', rating: 2775, accuracy: 91.2 },
      { month: 'Feb', rating: 2778, accuracy: 91.8 },
      { month: 'Mar', rating: 2780, accuracy: 92.1 },
      { month: 'Apr', rating: 2782, accuracy: 91.5 },
      { month: 'May', rating: 2780, accuracy: 91.8 },
    ]
  }
];

export const PlayersComparisonPage: React.FC = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerProfile[]>([mockPlayers[0], mockPlayers[1]]);
  const [comparisonMode, setComparisonMode] = useState<'style' | 'stats' | 'performance'>('style');

  const getStyleData = () => {
    return [
      { subject: 'العدوانية', player1: selectedPlayers[0]?.playingStyle.aggression || 0, player2: selectedPlayers[1]?.playingStyle.aggression || 0 },
      { subject: 'التكتيك', player1: selectedPlayers[0]?.playingStyle.tactical || 0, player2: selectedPlayers[1]?.playingStyle.tactical || 0 },
      { subject: 'الموقفي', player1: selectedPlayers[0]?.playingStyle.positional || 0, player2: selectedPlayers[1]?.playingStyle.positional || 0 },
      { subject: 'النهايات', player1: selectedPlayers[0]?.playingStyle.endgame || 0, player2: selectedPlayers[1]?.playingStyle.endgame || 0 },
      { subject: 'الافتتاح', player1: selectedPlayers[0]?.playingStyle.opening || 0, player2: selectedPlayers[1]?.playingStyle.opening || 0 },
      { subject: 'المخاطرة', player1: selectedPlayers[0]?.playingStyle.riskTaking || 0, player2: selectedPlayers[1]?.playingStyle.riskTaking || 0 },
    ];
  };

  const getStatsData = () => {
    if (!selectedPlayers[0] || !selectedPlayers[1]) return [];
    
    return [
      { name: 'الدقة', player1: selectedPlayers[0].statistics.averageAccuracy, player2: selectedPlayers[1].statistics.averageAccuracy },
      { name: 'الأخطاء/مباراة', player1: selectedPlayers[0].statistics.blundersPerGame, player2: selectedPlayers[1].statistics.blundersPerGame },
      { name: 'طول المباراة', player1: selectedPlayers[0].statistics.averageGameLength, player2: selectedPlayers[1].statistics.averageGameLength },
      { name: 'نسبة الفوز', player1: (selectedPlayers[0].statistics.wins / selectedPlayers[0].statistics.totalGames) * 100, player2: (selectedPlayers[1].statistics.wins / selectedPlayers[1].statistics.totalGames) * 100 },
    ];
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
              <h1 className="text-3xl font-bold text-white mb-2">مقارن الاستراتيجيات</h1>
              <p className="text-gray-400 font-mono">Strategic Player Analysis System</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-war-green">ANALYSIS MODE</span>
            </div>
          </div>

          {/* Comparison Mode Selector */}
          <div className="flex space-x-2 rtl:space-x-reverse mb-6">
            <TacticalButton
              variant={comparisonMode === 'style' ? 'primary' : 'ghost'}
              onClick={() => setComparisonMode('style')}
              icon={Brain}
            >
              أسلوب اللعب
            </TacticalButton>
            <TacticalButton
              variant={comparisonMode === 'stats' ? 'primary' : 'ghost'}
              onClick={() => setComparisonMode('stats')}
              icon={BarChart3}
            >
              الإحصائيات
            </TacticalButton>
            <TacticalButton
              variant={comparisonMode === 'performance' ? 'primary' : 'ghost'}
              onClick={() => setComparisonMode('performance')}
              icon={TrendingUp}
            >
              الأداء الحديث
            </TacticalButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Profiles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Players Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <TacticalCard 
                    title={player.name} 
                    subtitle={`Rating: ${player.rating}`}
                    glowColor={index === 0 ? 'primary' : 'secondary'}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-4xl">{player.avatar}</div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-tactical-success">{player.rating}</div>
                          <div className="text-sm text-gray-400">{player.country}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <div className="text-tactical-success font-bold">{player.statistics.wins}</div>
                          <div className="text-gray-400">انتصارات</div>
                        </div>
                        <div>
                          <div className="text-tactical-danger font-bold">{player.statistics.losses}</div>
                          <div className="text-gray-400">هزائم</div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-bold">{player.statistics.draws}</div>
                          <div className="text-gray-400">تعادل</div>
                        </div>
                      </div>

                      <div className="border-t border-tactical-primary/20 pt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">دقة متوسطة</span>
                          <span className="text-tactical-success font-bold">{player.statistics.averageAccuracy}%</span>
                        </div>
                      </div>
                    </div>
                  </TacticalCard>
                </motion.div>
              ))}
            </div>

            {/* Comparison Chart */}
            <TacticalCard title="التحليل المقارن" icon={BarChart3}>
              <div className="h-96">
                {comparisonMode === 'style' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={getStyleData()}>
                      <PolarGrid stroke="#1a4d3a" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                      />
                      <Radar
                        name={selectedPlayers[0]?.name}
                        dataKey="player1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name={selectedPlayers[1]?.name}
                        dataKey="player2"
                        stroke="#1e3a5f"
                        fill="#1e3a5f"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}

                {comparisonMode === 'stats' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getStatsData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a4d3a" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #1a4d3a',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      />
                      <Bar dataKey="player1" fill="#10b981" name={selectedPlayers[0]?.name} />
                      <Bar dataKey="player2" fill="#1e3a5f" name={selectedPlayers[1]?.name} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {comparisonMode === 'performance' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">مخطط الأداء الحديث</p>
                      <p className="text-sm text-gray-500 mt-2">قريباً...</p>
                    </div>
                  </div>
                )}
              </div>
            </TacticalCard>

            {/* Detailed Analysis */}
            <TacticalCard title="التحليل التفصيلي" icon={Target}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">نقاط القوة</h4>
                  <div className="space-y-2">
                    {selectedPlayers[0] && (
                      <div className="p-3 bg-tactical-success/10 rounded-lg border border-tactical-success/20">
                        <div className="text-tactical-success font-medium">{selectedPlayers[0].name}</div>
                        <div className="text-sm text-gray-300">تفوق في النهايات والتحليل الموقفي</div>
                      </div>
                    )}
                    {selectedPlayers[1] && (
                      <div className="p-3 bg-tactical-secondary/10 rounded-lg border border-tactical-secondary/20">
                        <div className="text-blue-400 font-medium">{selectedPlayers[1].name}</div>
                        <div className="text-sm text-gray-300">سرعة في اللعب والتكتيكات الحادة</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">الافتتاحات المفضلة</h4>
                  <div className="space-y-3">
                    {selectedPlayers.map((player, index) => (
                      <div key={player.id}>
                        <div className="text-sm font-medium text-gray-400 mb-1">{player.name}</div>
                        <div className="flex flex-wrap gap-1">
                          {player.favoriteOpenings.map((opening, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-war-light/20 rounded text-xs text-gray-300"
                            >
                              {opening}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TacticalCard>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Player Selection */}
            <TacticalCard title="اختيار اللاعبين" icon={Users}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">اللاعب الأول</label>
                  <select 
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                    value={selectedPlayers[0]?.id || ''}
                    onChange={(e) => {
                      const player = mockPlayers.find(p => p.id === e.target.value);
                      if (player) {
                        setSelectedPlayers([player, selectedPlayers[1]]);
                      }
                    }}
                  >
                    {mockPlayers.map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">اللاعب الثاني</label>
                  <select 
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                    value={selectedPlayers[1]?.id || ''}
                    onChange={(e) => {
                      const player = mockPlayers.find(p => p.id === e.target.value);
                      if (player) {
                        setSelectedPlayers([selectedPlayers[0], player]);
                      }
                    }}
                  >
                    {mockPlayers.map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                </div>

                <TacticalButton className="w-full" icon={Zap}>
                  تحديث المقارنة
                </TacticalButton>
              </div>
            </TacticalCard>

            {/* Quick Stats */}
            <TacticalCard title="إحصائيات سريعة">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-war-light/10 rounded">
                  <span className="text-sm text-gray-400">فرق التقييم</span>
                  <span className="text-white font-mono">
                    {Math.abs((selectedPlayers[0]?.rating || 0) - (selectedPlayers[1]?.rating || 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-war-light/10 rounded">
                  <span className="text-sm text-gray-400">فرق الدقة</span>
                  <span className="text-white font-mono">
                    {Math.abs((selectedPlayers[0]?.statistics.averageAccuracy || 0) - (selectedPlayers[1]?.statistics.averageAccuracy || 0)).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-war-light/10 rounded">
                  <span className="text-sm text-gray-400">إجمالي المباريات</span>
                  <span className="text-white font-mono">
                    {(selectedPlayers[0]?.statistics.totalGames || 0) + (selectedPlayers[1]?.statistics.totalGames || 0)}
                  </span>
                </div>
              </div>
            </TacticalCard>

            {/* Actions */}
            <TacticalCard title="إجراءات">
              <div className="space-y-2">
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  تصدير المقارنة
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  حفظ التحليل
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost" size="sm">
                  مشاركة النتائج
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};