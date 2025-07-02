import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Trash2,
  Star,
  Calendar,
  User,
  Trophy,
  Target
} from 'lucide-react';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';

interface GameRecord {
  id: string;
  white: string;
  black: string;
  event: string;
  site: string;
  date: string;
  result: string;
  eco: string;
  opening: string;
  rating: {
    white: number;
    black: number;
  };
  moves: number;
  accuracy: {
    white: number;
    black: number;
  };
  classification: 'brilliant' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  favorite: boolean;
}

const mockGames: GameRecord[] = [
  {
    id: '1',
    white: 'Magnus Carlsen',
    black: 'Hikaru Nakamura',
    event: 'World Championship 2023',
    site: 'Dubai, UAE',
    date: '2023.12.15',
    result: '1-0',
    eco: 'C42',
    opening: 'Russian Game: Italian Variation',
    rating: { white: 2830, black: 2780 },
    moves: 67,
    accuracy: { white: 94.2, black: 91.8 },
    classification: 'excellent',
    favorite: true,
  },
  {
    id: '2',
    white: 'Fabiano Caruana',
    black: 'Ding Liren',
    event: 'Candidates Tournament 2024',
    site: 'Madrid, Spain',
    date: '2024.01.20',
    result: '1/2-1/2',
    eco: 'D37',
    opening: 'Queen\'s Gambit Declined',
    rating: { white: 2805, black: 2780 },
    moves: 89,
    accuracy: { white: 96.1, black: 95.8 },
    classification: 'brilliant',
    favorite: false,
  },
  {
    id: '3',
    white: 'Ian Nepomniachtchi',
    black: 'Anish Giri',
    event: 'Tata Steel Masters 2024',
    site: 'Wijk aan Zee, Netherlands',
    date: '2024.01.15',
    result: '0-1',
    eco: 'B90',
    opening: 'Sicilian Defense: Najdorf Variation',
    rating: { white: 2771, black: 2764 },
    moves: 54,
    accuracy: { white: 87.3, black: 92.4 },
    classification: 'good',
    favorite: true,
  },
  {
    id: '4',
    white: 'Wesley So',
    black: 'Maxime Vachier-Lagrave',
    event: 'Grand Prix 2024',
    site: 'Berlin, Germany',
    date: '2024.02.10',
    result: '1-0',
    eco: 'E04',
    opening: 'Catalan Opening',
    rating: { white: 2757, black: 2750 },
    moves: 42,
    accuracy: { white: 89.7, black: 84.2 },
    classification: 'mistake',
    favorite: false,
  },
];

export const DatabasePage: React.FC = () => {
  const [games, setGames] = useState<GameRecord[]>(mockGames);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites' | 'recent'>('all');
  const [selectedClassification, setSelectedClassification] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'accuracy'>('date');

  const getClassificationColor = (classification: string) => {
    const colors = {
      brilliant: 'text-tactical-success bg-tactical-success/10 border-tactical-success/20',
      excellent: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      good: 'text-war-green bg-war-green/10 border-war-green/20',
      inaccuracy: 'text-tactical-warning bg-tactical-warning/10 border-tactical-warning/20',
      mistake: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      blunder: 'text-tactical-danger bg-tactical-danger/10 border-tactical-danger/20',
    };
    return colors[classification as keyof typeof colors] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  };

  const getClassificationLabel = (classification: string) => {
    const labels = {
      brilliant: 'رائع',
      excellent: 'ممتاز',
      good: 'جيد',
      inaccuracy: 'عدم دقة',
      mistake: 'خطأ',
      blunder: 'خطأ فادح',
    };
    return labels[classification as keyof typeof labels] || classification;
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = 
      game.white.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.black.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.opening.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      selectedFilter === 'all' ||
      (selectedFilter === 'favorites' && game.favorite) ||
      (selectedFilter === 'recent' && new Date(game.date).getFullYear() === 2024);

    const matchesClassification = 
      selectedClassification === 'all' || game.classification === selectedClassification;

    return matchesSearch && matchesFilter && matchesClassification;
  });

  const toggleFavorite = (gameId: string) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, favorite: !game.favorite } : game
    ));
  };

  const deleteGame = (gameId: string) => {
    setGames(games.filter(game => game.id !== gameId));
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
              <h1 className="text-3xl font-bold text-white mb-2">قاعدة الاستخبارات</h1>
              <p className="text-gray-400 font-mono">Chess Intelligence Database</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-war-green">DATABASE ONLINE</span>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TacticalCard title="إجمالي المباريات" className="text-center">
              <div className="text-2xl font-bold text-tactical-success">{games.length}</div>
            </TacticalCard>
            <TacticalCard title="المباريات المفضلة" className="text-center">
              <div className="text-2xl font-bold text-tactical-warning">{games.filter(g => g.favorite).length}</div>
            </TacticalCard>
            <TacticalCard title="متوسط الدقة" className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {(games.reduce((acc, game) => acc + (game.accuracy.white + game.accuracy.black) / 2, 0) / games.length).toFixed(1)}%
              </div>
            </TacticalCard>
            <TacticalCard title="آخر تحديث" className="text-center">
              <div className="text-lg font-bold text-war-green">اليوم</div>
            </TacticalCard>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Panel */}
          <div className="space-y-6">
            {/* Search */}
            <TacticalCard title="البحث والتصفية" icon={Search}>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في المباريات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2 text-white focus:border-tactical-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">التصفية</label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value as any)}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="all">جميع المباريات</option>
                    <option value="favorites">المفضلة</option>
                    <option value="recent">الحديثة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">التصنيف</label>
                  <select
                    value={selectedClassification}
                    onChange={(e) => setSelectedClassification(e.target.value)}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="all">جميع التصنيفات</option>
                    <option value="brilliant">رائع</option>
                    <option value="excellent">ممتاز</option>
                    <option value="good">جيد</option>
                    <option value="inaccuracy">عدم دقة</option>
                    <option value="mistake">خطأ</option>
                    <option value="blunder">خطأ فادح</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">ترتيب حسب</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="date">التاريخ</option>
                    <option value="rating">التقييم</option>
                    <option value="accuracy">الدقة</option>
                  </select>
                </div>
              </div>
            </TacticalCard>

            {/* Quick Actions */}
            <TacticalCard title="إجراءات سريعة">
              <div className="space-y-2">
                <TacticalButton className="w-full" icon={Upload} variant="ghost" size="sm">
                  استيراد PGN
                </TacticalButton>
                <TacticalButton className="w-full" icon={Download} variant="ghost" size="sm">
                  تصدير قاعدة البيانات
                </TacticalButton>
                <TacticalButton className="w-full" icon={Target} variant="ghost" size="sm">
                  تحليل شامل
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>

          {/* Games List */}
          <div className="lg:col-span-3">
            <TacticalCard title={`المباريات (${filteredGames.length})`} icon={Database}>
              <div className="space-y-4">
                {filteredGames.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">لا توجد مباريات تطابق معايير البحث</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredGames.map((game) => (
                      <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-war-light/20 rounded-lg border border-tactical-primary/20 hover:border-tactical-primary/40 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                              <h3 className="text-white font-semibold">
                                {game.white} vs {game.black}
                              </h3>
                              <span className={`px-2 py-1 rounded text-xs border ${getClassificationColor(game.classification)}`}>
                                {getClassificationLabel(game.classification)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <Trophy className="w-3 h-3" />
                                <span>{game.event}</span>
                              </div>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <Calendar className="w-3 h-3" />
                                <span>{game.date}</span>
                              </div>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <Target className="w-3 h-3" />
                                <span>{game.opening}</span>
                              </div>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <User className="w-3 h-3" />
                                <span>النتيجة: {game.result}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <TacticalButton
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleFavorite(game.id)}
                              className={game.favorite ? 'text-tactical-warning' : ''}
                            >
                              <Star className={`w-4 h-4 ${game.favorite ? 'fill-current' : ''}`} />
                            </TacticalButton>
                            <TacticalButton size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </TacticalButton>
                            <TacticalButton 
                              size="sm" 
                              variant="ghost"
                              onClick={() => deleteGame(game.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </TacticalButton>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
                          <div>
                            <div className="text-gray-400">تقييم أبيض</div>
                            <div className="text-white font-mono">{game.rating.white}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">تقييم أسود</div>
                            <div className="text-white font-mono">{game.rating.black}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">دقة أبيض</div>
                            <div className="text-tactical-success font-mono">{game.accuracy.white}%</div>
                          </div>
                          <div>
                            <div className="text-gray-400">دقة أسود</div>
                            <div className="text-tactical-success font-mono">{game.accuracy.black}%</div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-tactical-primary/20">
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>ECO: {game.eco}</span>
                            <span>{game.moves} نقلة</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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