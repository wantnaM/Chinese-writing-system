import { Check, Sparkles, Star, BookOpen } from "lucide-react";
import type { Unit } from "../data/units";
import { motion } from "motion/react";

interface UnitCardProps {
  unit: Unit;
  onClick?: () => void;
}

// Rotating color schemes for cards
const cardThemes = [
  {
    bg: "from-blue-50 to-blue-100",
    accent: "bg-blue-500",
    accentLight: "bg-blue-100",
    accentBorder: "border-blue-300",
    progressBg: "bg-blue-400",
    progressTrack: "bg-blue-100",
    tagBg: "bg-blue-500/10",
    tagText: "text-blue-600",
    decoColor1: "bg-pink-300",
    decoColor2: "bg-blue-300",
    decoColor3: "bg-purple-300",
    headerGradient: "from-blue-400 to-blue-600",
    shadowColor: "shadow-blue-200/60",
    iconBg: "bg-blue-500",
  },
];

export function UnitCard({ unit, onClick }: UnitCardProps) {
  const completedThemes = unit.themes.filter(t => t.completed).length;
  const totalThemes = unit.themes.length;
  const progressPercent = (completedThemes / totalThemes) * 100;
  const isCompleted = unit.completed || completedThemes === totalThemes;
  const theme = cardThemes[0];

  return (
    <div className="relative" onClick={onClick}>
      {/* Decorative elements around the card */}
      <motion.div
        className={`absolute -top-2 -right-2 w-5 h-5 ${theme.decoColor1} rounded-full opacity-60 z-20`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute -bottom-1 -left-1 w-3 h-3 ${theme.decoColor2} rounded-full opacity-50 z-20`}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className={`absolute top-1/3 -left-2 w-2 h-2 ${theme.decoColor3} rotate-45 opacity-40 z-20`}
        animate={{ rotate: [45, 90, 45], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className={`absolute -top-1 left-1/4 z-20`}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-400 opacity-60" />
      </motion.div>
      <motion.div
        className={`absolute bottom-4 -right-1.5 z-20`}
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star className="w-3 h-3 text-blue-400 opacity-50 fill-blue-400" />
      </motion.div>

      {/* Main Card */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative cursor-pointer rounded-2xl bg-gradient-to-br ${theme.bg} border ${theme.accentBorder} overflow-hidden shadow-lg ${theme.shadowColor} hover:shadow-xl transition-shadow duration-300`}
      >
        {/* Top gradient bar with pattern */}
        <div className={`relative h-28 bg-gradient-to-r ${theme.headerGradient} overflow-hidden`}>
          {/* Decorative circles in header */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute top-8 -left-6 w-16 h-16 bg-white/10 rounded-full" />
          <div className="absolute -bottom-2 right-10 w-10 h-10 bg-white/10 rounded-full" />

          {/* Wavy bottom edge */}
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 400 30" preserveAspectRatio="none" style={{ height: '16px' }}>
            <path d="M0,30 C100,0 200,30 300,10 C350,0 380,15 400,10 L400,30 Z" fill="white" opacity="0.15" />
            <path d="M0,30 C80,10 160,25 240,15 C320,5 360,20 400,15 L400,30 Z" className="fill-blue-50 opacity-80" style={{ fill: 'inherit' }} />
          </svg>

          {/* Unit number badge */}
          <div className="absolute top-3 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs" style={{ fontWeight: 600 }}>
              单元 {unit.id}
            </span>
          </div>

          {/* Completed badge */}
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-4 bg-white rounded-full p-1.5 shadow-md"
            >
              <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
            </motion.div>
          )}

          {/* Floating icon */}
          <div className="absolute bottom-2 right-4">
            <div className={`w-12 h-12 ${theme.iconBg} rounded-xl shadow-lg flex items-center justify-center transform rotate-6`}>
              <span className="text-2xl">🌿</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-4">
          <h3 className="text-lg text-gray-900 mb-1.5" style={{ fontWeight: 800 }}>
            {unit.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2" style={{ lineHeight: '1.5' }}>
            {unit.description}
          </p>

          {/* Tags */}
          <div className="flex gap-1.5 mb-4 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full ${theme.tagBg} ${theme.tagText}`} style={{ fontWeight: 500 }}>
              {totalThemes} 个主题
            </span>
            {isCompleted ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600" style={{ fontWeight: 500 }}>
                已完成
              </span>
            ) : completedThemes > 0 ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600" style={{ fontWeight: 500 }}>
                学习中
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-500" style={{ fontWeight: 500 }}>
                未开始
              </span>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span style={{ fontWeight: 600 }}>学习进度</span>
              <span style={{ fontWeight: 700 }} className={theme.tagText}>
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className={`w-full ${theme.progressTrack} rounded-full h-2.5 overflow-hidden`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className={`h-full ${theme.progressBg} rounded-full relative`}
              >
                {progressPercent > 0 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                )}
              </motion.div>
            </div>
            <div className="text-xs text-gray-400" style={{ fontWeight: 500 }}>
              {isCompleted
                ? "🎉 太棒了！全部完成"
                : `已完成 ${completedThemes}/${totalThemes} 个主题`}
            </div>
          </div>
        </div>

        {/* Bottom decorative dots */}
        <div className="absolute bottom-2 right-3 flex gap-1 opacity-30">
          <div className={`w-1.5 h-1.5 ${theme.decoColor1} rounded-full`} />
          <div className={`w-1.5 h-1.5 ${theme.decoColor2} rounded-full`} />
          <div className={`w-1.5 h-1.5 ${theme.decoColor3} rounded-full`} />
        </div>
      </motion.div>
    </div>
  );
}
