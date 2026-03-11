import { DailyPoem } from "../components/DailyPoem";
import { BadgeDisplay } from "../components/BadgeDisplay";
import { UnitCard } from "../components/UnitCard";
import { units, badges, dailyPoems } from "../data/units";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  // Get today's poem based on date
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const todayPoem = dailyPoems[dayOfYear % dailyPoems.length];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">语文一体化学习平台</h1>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 上半部分：每日一诗 + 徽章墙 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* 每日一诗 */}
          <DailyPoem poem={todayPoem} />

          {/* 徽章展示墙 */}
          <BadgeDisplay badges={badges} />
        </div>

        {/* 下半部分：单元网格 */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">学习单元</h2>
            <p className="text-gray-600">选择一个单元开始你的学习之旅</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {units.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-2"
              >
                <UnitCard
                  unit={unit}
                  onClick={() => {
                    // 点击跳转到单元详情页面
                    navigate(`/unit/${unit.id}`);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* 页脚提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>💡 完成所有单元任务即可获得对应徽章</p>
        </motion.div>
      </main>
    </div>
  );
}