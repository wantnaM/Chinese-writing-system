import { useParams, Link, useNavigate } from "react-router";
import { units } from "../data/units";
import {
  ArrowLeft,
  CheckCircle,
  BookText,
  BookOpen,
  Pen,
  Camera,
  Sparkles,
  MessageCircleQuestion,
} from "lucide-react";
import { motion } from "motion/react";

// 课程类型配置
const lessonTypeConfig = {
  reading: {
    label: "阅读",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  appreciation: {
    label: "欣赏",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  activity: {
    label: "实践",
    icon: Camera,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  writing: {
    label: "写作",
    icon: Pen,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  exchange: {
    label: "交流",
    icon: MessageCircleQuestion,
    gradient: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-800",
  }
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
  const completedCount = unit.lessons.filter(
    (l) => l.completed,
  ).length;
  const progress = (completedCount / unit.lessons.length) * 100;

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
                    共 {unit.lessons.length} 课时
                  </span>
                  <span className="text-green-600 font-medium">
                    已完成 {completedCount} 课
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

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {unit.lessons.map((lesson, index) => {
            // 提供后备配置，防止类型不匹配时报错
            const typeConfig = lessonTypeConfig[lesson.type as keyof typeof lessonTypeConfig] || {
              label: "未知",
              icon: BookOpen,
              gradient: "from-gray-500 to-slate-500",
              bgColor: "bg-gray-100",
              textColor: "text-gray-800",
            };
            const TypeIcon = typeConfig.icon;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={`/unit/${unitId}/lesson/${lesson.id}`}
                  className="group block"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 border-2 border-amber-200 hover:shadow-2xl hover:border-amber-400 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    {/* Background Decoration */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${typeConfig.gradient} opacity-10 rounded-bl-full`}
                    ></div>

                    {/* Completed Badge */}
                    {lesson.completed && (
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

                    <div className="relative z-10">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${typeConfig.gradient} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
                        >
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                            {lesson.title}
                          </h3>
                          <div
                            className={`inline-block px-3 py-1 ${typeConfig.bgColor} ${typeConfig.textColor} text-xs sm:text-sm rounded-full font-medium`}
                          >
                            {typeConfig.label}
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-600">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 提示信息 */}
        {completedCount < unit.lessons.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-amber-700 bg-amber-100/50 backdrop-blur-sm rounded-xl p-4 border border-amber-200"
          >
            <p className="text-sm">
              💡 继续加油！完成所有课程即可获得本单元徽章
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}