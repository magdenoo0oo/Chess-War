import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Map, 
  Swords, 
  Database,
  Activity,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';

const stats = [
  { icon: Database, label: 'مباريات محللة', value: '12,847', color: 'text-tactical-success' },
  { icon: Users, label: 'لاعبون في النظام', value: '2,340', color: 'text-tactical-warning' },
  { icon: Activity, label: 'تحليلات نشطة', value: '156', color: 'text-blue-400' },
  { icon: Award, label: 'دقة التحليل', value: '98.5%', color: 'text-war-green' },
];

const features = [
  {
    icon: Target,
    title: 'عارض المباريات التكتيكي',
    description: 'تحليل شامل للمباريات التاريخية مع تقييم Stockfish المتقدم',
    path: '/viewer',
    color: 'primary'
  },
  {
    icon: Shield,
    title: 'محاكي السيناريوهات',
    description: 'اختبار النقلات البديلة وتحليل "ماذا لو" للمواقف الحرجة',
    path: '/simulator',
    color: 'secondary'
  },
  {
    icon: Map,
    title: 'خريطة السيطرة العسكرية',
    description: 'تصور ديناميكي لخريطة السيطرة على اللوحة في الوقت الفعلي',
    path: '/territory',
    color: 'success'
  },
  {
    icon: Swords,
    title: 'محاكي المعارك',
    description: 'خوض معارك تكتيكية ضد الذكاء الاصطناعي المتقدم',
    path: '/battle',
    color: 'warning'
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Command Status */}
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-tactical-primary/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-war-green rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-war-green">TACTICAL SYSTEMS ONLINE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-war-green to-white bg-clip-text text-transparent">
            Chess War Room
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-war-green mb-6 font-mono">
            غرفة الحرب 
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            نظام تحليل الشطرنج العسكري المتقدم. تحليل استراتيجي عميق للمباريات التاريخية 
            ومحاكاة السيناريوهات التكتيكية بتقنيات الذكاء الاصطناعي المتطورة
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse">
            <Link to="/viewer">
              <TacticalButton size="lg" icon={Target}>
                بدء التحليل التكتيكي
              </TacticalButton>
            </Link>
            <Link to="/database">
              <TacticalButton variant="ghost" size="lg" icon={Database}>
                استكشاف قاعدة البيانات
              </TacticalButton>
            </Link>
          </div>
        </motion.div>
        
        {/* Tactical Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(26,77,58,0.1)_35%,rgba(26,77,58,0.1)_65%,transparent_65%)] bg-[length:20px_20px]"></div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">إحصائيات المركز التكتيكي</h3>
            <p className="text-gray-400">البيانات في الوقت الفعلي لأنظمة التحليل</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <TacticalCard title="" className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="p-4 bg-tactical-primary/20 rounded-xl mb-4">
                      <stat.icon className="w-8 h-8 text-war-green" />
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </TacticalCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">الأنظمة التكتيكية المتقدمة</h3>
            <p className="text-gray-400">مجموعة شاملة من أدوات التحليل العسكري للشطرنج</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <Link to={feature.path}>
                  <TacticalCard
                    title={feature.title}
                    subtitle={feature.description}
                    icon={feature.icon}
                    glowColor={feature.color as any}
                    className="h-full hover:scale-102 transition-transform duration-300"
                  >
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-war-green font-mono text-sm">SYSTEM STATUS: ACTIVE</span>
                      <TacticalButton variant="ghost" size="sm">
                        الدخول للنظام
                      </TacticalButton>
                    </div>
                  </TacticalCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Command Center Status */}
      <section className="py-16 px-4 border-t border-tactical-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-war-gray/30 backdrop-blur-sm rounded-xl p-8 border border-tactical-primary/30">
              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-6">
                <div className="w-3 h-3 bg-war-green rounded-full animate-pulse"></div>
                <h4 className="text-xl font-bold text-white">Command Center Status</h4>
                <div className="w-3 h-3 bg-war-green rounded-full animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-tactical-success mb-2">OPERATIONAL</div>
                  <div className="text-sm text-gray-400">Analysis Engine</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-tactical-success mb-2">SECURE</div>
                  <div className="text-sm text-gray-400">Data Systems</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-tactical-success mb-2">READY</div>
                  <div className="text-sm text-gray-400">Battle Simulator</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Creative Copyright Section */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.0 }}
  className="mt-12"
>
  <div className="relative">
    {/* Glowing border effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-tactical-primary/20 via-war-green/30 to-tactical-primary/20 rounded-lg blur-sm"></div>
    
    <div className="relative bg-black/60 backdrop-blur-md rounded-lg p-6 border border-tactical-primary/40">
      {/* Animated corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-war-green animate-pulse"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-war-green animate-pulse"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-war-green animate-pulse"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-war-green animate-pulse"></div>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left side - Logo/Icon */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-war-green to-tactical-primary rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">©</span>
          </div>
          
          <div className="text-left">
            <div className="text-war-green font-bold text-lg">CLASSIFIED</div>
            <div className="text-xs text-gray-400">PROPRIETORY TECH</div>
          </div>
        </div>

        {/* Center - Copyright text */}
        <div className="text-center">
          <div className="text-white font-semibold mb-1">
            جميع الحقوق محفوظة
          </div>
          
          <div className="text-tactical-primary font-bold text-lg">
            Magdy Zahran
          </div>
          
          <div className="text-xs text-gray-400 mt-1">
            Strategic Systems Developer
          </div>
        </div>

        {/* Right side - Status indicator */}
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-war-green rounded-full animate-ping"></div>
            <div className="text-xs text-war-green mt-1">ACTIVE</div>
          </div>
          
          <div className="text-xs text-gray-400 text-right">
            <div>Build: v2.1.5</div>
            <div>Status: LIVE</div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="mt-4 pt-4 border-t border-tactical-primary/30">
        <div className="text-center text-xs text-gray-500">
          <span className="inline-flex items-center space-x-2">
            <span>Powered by Advanced Tactical Systems</span>
            <div className="w-1 h-1 bg-war-green rounded-full animate-pulse"></div>
            <span>2025</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</motion.div>
        </div>
      </section>
    </div>
  );
};