import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

interface DailyPoemProps {
  poem: {
    content: string;
    author: string;
  };
}

export function DailyPoem({ poem }: DailyPoemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-xl shadow-lg p-8 overflow-hidden h-full flex flex-col"
    >
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-100/30 to-transparent rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full -ml-24 -mb-24"></div>

      {/* 内容区域 */}
      <div className="relative flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <BookOpen className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-bold text-red-900">每日一诗</h2>
        </div>

        {/* 诗词内容 */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <p className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed text-center py-6">
            {poem.content}
          </p>
        </div>

        {/* 作者信息 */}
        <div className="flex justify-end mt-auto shrink-0">
          <div className="text-right">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{poem.author}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 装饰性水印 */}
      <div className="absolute bottom-4 left-4 text-6xl opacity-5 select-none">
        📜
      </div>
    </motion.div>
  );
}