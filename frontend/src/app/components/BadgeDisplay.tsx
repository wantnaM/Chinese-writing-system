import type { Badge } from "../data/units";
import { motion } from "motion/react";

interface BadgeDisplayProps {
  badges: Badge[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        我的徽章
      </h2>
      
      <div className="flex flex-wrap gap-4 flex-1 content-start">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            className="relative group"
          >
            <div
              className={`
                w-20 h-20 rounded-full flex items-center justify-center text-3xl
                transition-all duration-300
                ${badge.earned 
                  ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg scale-100 cursor-pointer hover:scale-110' 
                  : 'bg-gray-200 opacity-50 grayscale'
                }
              `}
              style={badge.earned ? {} : {}}
            >
              {badge.icon}
            </div>
            
            {/* 徽章名称提示 */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {badge.name}
              </div>
            </div>

            {/* 未获得徽章的锁定标记 */}
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-sm">🔒</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 徽章统计 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          已获得 <span className="font-bold text-yellow-600">{badges.filter(b => b.earned).length}</span> / {badges.length} 个徽章
        </div>
      </div>
    </div>
  );
}