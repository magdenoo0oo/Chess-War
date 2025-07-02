import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Globe, 
  Moon, 
  Sun,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  Save,
  RotateCcw,
  Shield,
  Database,
  Zap
} from 'lucide-react';
import { TacticalCard } from '../components/UI/TacticalCard';
import { TacticalButton } from '../components/UI/TacticalButton';

interface SettingsState {
  language: 'ar' | 'en';
  theme: 'dark' | 'light' | 'auto';
  soundEnabled: boolean;
  notifications: boolean;
  autoSave: boolean;
  boardStyle: 'classic' | 'modern' | 'tactical';
  animationSpeed: 'slow' | 'normal' | 'fast';
  analysisDepth: number;
  showCoordinates: boolean;
  highlightMoves: boolean;
  engineStrength: number;
}

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    language: 'ar',
    theme: 'dark',
    soundEnabled: true,
    notifications: true,
    autoSave: true,
    boardStyle: 'tactical',
    animationSpeed: 'normal',
    analysisDepth: 18,
    showCoordinates: true,
    highlightMoves: true,
    engineStrength: 2400,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Save settings logic here
    setHasChanges(false);
    // Show success toast
  };

  const resetSettings = () => {
    setSettings({
      language: 'ar',
      theme: 'dark',
      soundEnabled: true,
      notifications: true,
      autoSave: true,
      boardStyle: 'tactical',
      animationSpeed: 'normal',
      analysisDepth: 18,
      showCoordinates: true,
      highlightMoves: true,
      engineStrength: 2400,
    });
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">إعدادات النظام</h1>
              <p className="text-gray-400 font-mono">System Configuration Panel</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className={`w-2 h-2 rounded-full ${hasChanges ? 'bg-tactical-warning animate-pulse' : 'bg-war-green'}`}></div>
              <span className="text-xs font-mono text-war-green">
                {hasChanges ? 'CHANGES PENDING' : 'SYSTEM STABLE'}
              </span>
            </div>
          </div>

          {/* Save/Reset Actions */}
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 rtl:space-x-reverse mb-6 p-4 bg-tactical-warning/10 border border-tactical-warning/20 rounded-lg"
            >
              <div className="flex-1">
                <div className="text-tactical-warning font-medium">يوجد تغييرات غير محفوظة</div>
                <div className="text-sm text-gray-400">احفظ التغييرات لتطبيقها على النظام</div>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <TacticalButton onClick={saveSettings} icon={Save} variant="primary">
                  حفظ التغييرات
                </TacticalButton>
                <TacticalButton onClick={resetSettings} icon={RotateCcw} variant="ghost">
                  إعادة تعيين
                </TacticalButton>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="space-y-6">
            <TacticalCard title="الإعدادات العامة" icon={Settings}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">اللغة</label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSetting('language', e.target.value as 'ar' | 'en')}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">المظهر</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'dark', icon: Moon, label: 'داكن' },
                      { value: 'light', icon: Sun, label: 'فاتح' },
                      { value: 'auto', icon: Monitor, label: 'تلقائي' },
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => updateSetting('theme', value as any)}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          settings.theme === value
                            ? 'bg-tactical-primary border-tactical-primary text-white'
                            : 'bg-war-light/20 border-tactical-primary/30 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">الأصوات</div>
                    <div className="text-sm text-gray-400">تشغيل أصوات النقلات والتنبيهات</div>
                  </div>
                  <button
                    onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.soundEnabled ? 'text-tactical-success' : 'text-gray-400'
                    }`}
                  >
                    {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">التنبيهات</div>
                    <div className="text-sm text-gray-400">إشعارات التحليل والأحداث</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => updateSetting('notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tactical-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">الحفظ التلقائي</div>
                    <div className="text-sm text-gray-400">حفظ التقدم والتحليلات تلقائياً</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => updateSetting('autoSave', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tactical-primary"></div>
                  </label>
                </div>
              </div>
            </TacticalCard>

            {/* Chess Board Settings */}
            <TacticalCard title="إعدادات اللوحة" icon={Shield}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">نمط اللوحة</label>
                  <select
                    value={settings.boardStyle}
                    onChange={(e) => updateSetting('boardStyle', e.target.value as any)}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="classic">كلاسيكي</option>
                    <option value="modern">حديث</option>
                    <option value="tactical">تكتيكي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">سرعة الحركة</label>
                  <select
                    value={settings.animationSpeed}
                    onChange={(e) => updateSetting('animationSpeed', e.target.value as any)}
                    className="w-full bg-war-light/50 border border-tactical-primary/30 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="slow">بطيء</option>
                    <option value="normal">عادي</option>
                    <option value="fast">سريع</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">إظهار الإحداثيات</div>
                    <div className="text-sm text-gray-400">عرض أرقام وحروف المربعات</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showCoordinates}
                      onChange={(e) => updateSetting('showCoordinates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tactical-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">تمييز النقلات</div>
                    <div className="text-sm text-gray-400">إبراز النقلات الممكنة والأخيرة</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.highlightMoves}
                      onChange={(e) => updateSetting('highlightMoves', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tactical-primary"></div>
                  </label>
                </div>
              </div>
            </TacticalCard>
          </div>

          {/* Analysis Settings */}
          <div className="space-y-6">
            <TacticalCard title="إعدادات التحليل" icon={Database}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    عمق التحليل: {settings.analysisDepth}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={settings.analysisDepth}
                    onChange={(e) => updateSetting('analysisDepth', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>سريع (10)</span>
                    <span>متوازن (18)</span>
                    <span>عميق (25)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    قوة المحرك: {settings.engineStrength} ELO
                  </label>
                  <input
                    type="range"
                    min="1200"
                    max="3000"
                    step="100"
                    value={settings.engineStrength}
                    onChange={(e) => updateSetting('engineStrength', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>مبتدئ (1200)</span>
                    <span>متقدم (2400)</span>
                    <span>خبير (3000)</span>
                  </div>
                </div>

                <div className="p-4 bg-tactical-primary/10 rounded-lg border border-tactical-primary/20">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <Zap className="w-4 h-4 text-tactical-warning" />
                    <span className="text-tactical-warning font-medium">تحذير الأداء</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    الإعدادات العالية قد تؤثر على سرعة التحليل. يُنصح بالإعدادات المتوازنة للاستخدام العادي.
                  </div>
                </div>
              </div>
            </TacticalCard>

            {/* System Information */}
            <TacticalCard title="معلومات النظام" icon={Monitor}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">إصدار النظام</span>
                  <span className="text-white font-mono">v2.1.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">محرك التحليل</span>
                  <span className="text-white font-mono">Stockfish 16</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">قاعدة البيانات</span>
                  <span className="text-white font-mono">12,847 مباراة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">آخر تحديث</span>
                  <span className="text-white font-mono">2024-01-15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">حالة الاتصال</span>
                  <span className="text-tactical-success font-mono">متصل</span>
                </div>
              </div>
            </TacticalCard>

            {/* Advanced Settings */}
            <TacticalCard title="إعدادات متقدمة" icon={Shield}>
              <div className="space-y-4">
                <TacticalButton className="w-full" variant="ghost">
                  تصدير الإعدادات
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost">
                  استيراد الإعدادات
                </TacticalButton>
                <TacticalButton className="w-full" variant="ghost">
                  مسح ذاكرة التخزين المؤقت
                </TacticalButton>
                <TacticalButton className="w-full" variant="danger">
                  إعادة تعيين المصنع
                </TacticalButton>
              </div>
            </TacticalCard>
          </div>
        </div>
      </div>
    </div>
  );
};