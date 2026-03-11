import { ArrowRight, Check, Book, Award, Sparkles } from "lucide-react";

/**
 * 原型图说明页面
 * 展示首页的设计布局和功能说明
 */
export function PrototypeGuide() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          首页原型图说明
        </h1>

        {/* 整体布局说明 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">整体布局</h2>
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">顶部导航栏</h3>
                  <p className="text-gray-600">固定在顶部，包含平台标题和Logo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">上半部分（左右布局）</h3>
                  <p className="text-gray-600">
                    左侧：每日一诗卡片 | 右侧：徽章展示墙
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">下半部分</h3>
                  <p className="text-gray-600">单元网格（书本卡片形式展示）</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 每日一诗 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            每日一诗组件
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 rounded-xl p-6 border-2 border-red-200">
              <div className="mb-4">
                <span className="text-sm font-bold text-red-600">组件预览</span>
              </div>
              <p className="text-2xl font-serif text-gray-800 text-center py-4">
                明月松间照，清泉石上流
              </p>
              <div className="text-right text-sm text-gray-600 mt-4">
                【唐】王维
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">设计要点：</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>渐变背景（红-橙-琥珀色系）营造诗意氛围</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>诗词内容居中，使用大号字体突出显示</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>作者信息位于右下方，格式：【朝代】作者名</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>装饰性背景图案增强视觉效果</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 徽章展示墙 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            徽章展示墙组件
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                我的徽章
              </h3>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-2xl shadow-lg">
                  🌿
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-2xl shadow-lg">
                  ⭐
                </div>
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl opacity-50 grayscale">
                  📖
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                已获得 <span className="font-bold text-yellow-600">2</span> / 5 个徽章
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">设计要点：</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>已获得的徽章：彩色显示，带金色渐变背景和阴影</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>未获得的徽章：灰度显示，带锁定图标</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>鼠标悬停显示徽章名称提示</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>底部显示徽章获得进度统计</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 单元卡片 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Book className="w-6 h-6 text-amber-600" />
            单元卡片（书本样式）
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg border-l-8 border-amber-600 h-64 overflow-hidden">
              {/* 完成标记 */}
              <div className="absolute top-2 right-2 z-10 bg-emerald-500 text-white rounded-full p-1.5">
                <Check className="w-5 h-5" />
              </div>

              <div className="relative p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">
                    亲近自然
                  </h3>
                  <p className="text-sm text-amber-700">
                    观察自然之美，感受四季更迭
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-amber-700">
                      <span>学习进度</span>
                      <span>8/8</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div className="w-full h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" />
                    </div>
                  </div>
                  <div className="text-xs text-amber-600 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    已完成全部任务
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">设计要点：</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>书本造型：琥珀色渐变背景 + 左侧深色书脊</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>完成标记：右上角绿色圆形打勾图标（仅已完成单元显示）</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>进度条：显示任务完成情况（已完成/总任务数）</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>悬停效果：向上浮动 + 放大 + 增强阴影</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>底部阴影模拟真实书本立体效果</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 响应式布局 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">响应式布局</h2>
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-bold text-gray-900 mb-2">手机端</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 上半部分垂直堆叠</li>
                  <li>• 单元卡片单列显示</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-bold text-gray-900 mb-2">平板端</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 上半部分左右布局</li>
                  <li>• 单元卡片 2 列显示</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-bold text-gray-900 mb-2">桌面端</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 上半部分左右布局</li>
                  <li>• 单元卡片 3-4 列显示</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 交互动画 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">动画效果</h2>
          <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-gray-900">页面加载</span>
                  <p className="text-gray-700">渐入动画，元素依次出现</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-gray-900">徽章展示</span>
                  <p className="text-gray-700">缩放弹簧动画，依次弹出</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-gray-900">单元卡片</span>
                  <p className="text-gray-700">悬停向上浮动 + 放大，进度条动态填充</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
