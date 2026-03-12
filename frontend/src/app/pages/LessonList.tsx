import { useParams, Link, useNavigate } from "react-router";
import { units } from "../data/units";
import {
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Camera,
  Lightbulb,
  Lock,
} from "lucide-react";
import { motion } from "motion/react";

// 主题类型配置
const themeTypeConfig = {
  themeReading: {
    label: "主题阅读",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    emoji: "📖",
  },
  themeActivity: {
    label: "主题活动",
    icon: Camera,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    emoji: "🎯",
  },
  techniqueLearning: {
    label: "技法学习",
    icon: Lightbulb,
    gradient: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
    emoji: "✍️",
  },
};

export default function LessonList() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = units.find((u) => u.id === Number(unitId));

  if (!unit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900">
            单元未找到
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // 计算完成进度
  const completedCount = unit.themes.filter(
    (t) => t.completed,
  ).length;
  const progress = (completedCount / unit.themes.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </button>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-amber-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-28 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                <img
                  src={unit.image}
                  alt={unit.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
                  {unit.title}
                </h1>
                <p className="text-amber-700 mb-3">
                  {unit.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-amber-600">
                    共 {unit.themes.length} 个主题
                  </span>
                  <span className="text-green-600 font-medium">
                    已完成 {completedCount} 个
                  </span>
                </div>
                {/* 进度条 */}
                <div className="mt-3 bg-amber-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                  />
                </div>
              </div>
              {unit.completed && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap">
                  <CheckCircle className="w-5 h-5" />
                  已完成
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {unit.themes.map((theme, index) => {
            const typeConfig = themeTypeConfig[theme.type] || {
              label: "未知",
              icon: BookOpen,
              gradient: "from-gray-500 to-slate-500",
              bgColor: "bg-gray-100",
              textColor: "text-gray-800",
              emoji: "📋",
            };
            const TypeIcon = typeConfig.icon;
            const isPlaceholder = theme.type === 'techniqueLearning';

            return (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {isPlaceholder ? (
                  <div className="group block">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 border-2 border-dashed border-gray-300 relative overflow-hidden min-h-[200px] flex flex-col">
                      {/* Background Decoration */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${typeConfig.gradient} opacity-5 rounded-bl-full`}
                      ></div>

                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
                          >
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-400 mb-2">
                              {theme.title}
                            </h3>
                            <div
                              className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs sm:text-sm rounded-full font-medium"
                            >
                              {typeConfig.label}
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-400">
                          {theme.description}
                        </p>

                        <div className="mt-auto pt-4 text-center">
                          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                            敬请期待
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={`/unit/${unitId}/theme/${theme.id}`}
                    className="group block"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 border-2 border-amber-200 hover:shadow-2xl hover:border-amber-400 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden min-h-[200px] flex flex-col">
                      {/* Background Decoration */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${typeConfig.gradient} opacity-10 rounded-bl-full`}
                      ></div>

                      {/* Completed Badge */}
                      {theme.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            delay: 0.2 * index,
                          }}
                          className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-md"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                      )}

                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${typeConfig.gradient} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
                          >
                            <TypeIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                              {theme.title}
                            </h3>
                            <div
                              className={`inline-block px-3 py-1 ${typeConfig.bgColor} ${typeConfig.textColor} text-xs sm:text-sm rounded-full font-medium`}
                            >
                              {typeConfig.label}
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm text-gray-600">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 提示信息 */}
        {completedCount < unit.themes.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-amber-700 bg-amber-100/50 backdrop-blur-sm rounded-xl p-4 border border-amber-200"
          >
            <p className="text-sm">
              💡 继续加油！完成所有主题即可获得本单元徽章
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
