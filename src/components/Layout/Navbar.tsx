import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Target, 
  Map, 
  Database, 
  Flame, 
  Swords,
  BarChart3,
  Settings,
  Home,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'المركز الرئيسي', nameEn: 'Command Center' },
  { path: '/viewer', icon: Target, label: 'عارض المباريات', nameEn: 'Game Viewer' },
  { path: '/simulator', icon: Shield, label: 'محاكي السيناريوهات', nameEn: 'What-If Simulator' },
  { path: '/comparison', icon: BarChart3, label: 'مقارن الاستراتيجيات', nameEn: 'Strategy Comparator' },
  { path: '/territory', icon: Map, label: 'خريطة السيطرة', nameEn: 'Territory Control' },
  { path: '/battle', icon: Swords, label: 'محاكي المعارك', nameEn: 'Battle Simulator' },
  { path: '/database', icon: Database, label: 'قاعدة الاستخبارات', nameEn: 'Intelligence DB' },
  { path: '/heatmap', icon: Flame, label: 'خريطة الأخطاء', nameEn: 'Blunder Heatmap' },
  { path: '/settings', icon: Settings, label: 'الإعدادات', nameEn: 'Settings' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
      <nav className="bg-war-gray/90 backdrop-blur-md border-b border-tactical-primary/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-tactical-primary rounded-lg flex items-center justify-center animate-pulse-glow">
                  <Shield className="w-5 h-5 text-war-green" />
                </div>
                <div className="absolute inset-0 bg-tactical-primary rounded-lg opacity-20 animate-pulse"></div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Chess War</h1>
              </div>
            </Link>
            
            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-0.5 rtl:space-x-reverse">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-2 py-1.5 mx-0.5 rounded-md text-xs font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-tactical-primary text-white shadow-lg shadow-tactical-primary/20' 
                          : 'text-gray-300 hover:text-white hover:bg-war-light/50'
                        }
                      `}
                    >
                      <Icon className="w-3.5 h-3.5 ml-1.5 rtl:ml-0 rtl:mr-1.5" />
                      <span className="hidden xl:inline whitespace-nowrap text-xs">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-war-light/50 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Tactical Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-tactical-primary to-transparent"></div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-war-gray/95 backdrop-blur-md border-b border-tactical-primary/30 sticky top-14 z-40"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-tactical-primary text-white shadow-lg shadow-tactical-primary/20' 
                          : 'text-gray-300 hover:text-white hover:bg-war-light/50'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 ml-2.5 rtl:ml-0 rtl:mr-2.5" />
                      <div>
                        <div className="text-sm">{item.label}</div>
                        <div className="text-xs text-gray-400 font-mono">{item.nameEn}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};