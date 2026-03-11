import { useParams, Link } from 'react-router';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { ReadingTask } from '../components/ReadingTask';
import { TodoTask } from '../components/TodoTask';

export function Lesson1Page() {
  const { unitId } = useParams();

  const handleTaskComplete = (taskNumber: number, content: string) => {
    console.log(`任务${taskNumber}完成:`, content);
    // 保存到 localStorage
    const key = `lesson-${unitId}-1-task-${taskNumber}`;
    localStorage.setItem(key, content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link 
            to={`/unit/${unitId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            返回课时列表
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* 课程标题 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl">第一课：主题阅读</h1>
          </div>
          <p className="text-blue-100">品读名家关于自然的美文，领会其主旨与情感</p>
        </div>

        {/* 学习指引 */}
        <section className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <h2 className="text-xl mb-3 text-gray-800">📖 学习指引</h2>
            <p className="text-gray-700 leading-relaxed">
              品读名家关于自然的美文，领会其主旨与情感，学习"语言风格借鉴法"和"添枝加叶法"。
              通过阅读经典散文，理解作者如何运用细腻的笔触描绘自然景物，如何将个人情感融入景物描写之中。
              在学习过程中，注意积累优美词句，体会不同的修辞手法和表达技巧。
            </p>
          </div>
        </section>

        {/* 名著导读 */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-gray-800">📚 名著导读</h2>
          
          <div className="bg-white rounded-xl p-6 shadow-md mb-6 border-l-4 border-green-500">
            <h3 className="text-lg mb-3 text-gray-800">导读指引</h3>
            <p className="text-gray-700 leading-relaxed">
              朱自清先生的《春》是现代散文的经典之作。文章以清新优美的语言，
              描绘了春天的五幅图画：春草图、春花图、春风图、春雨图和迎春图。
              作者运用了大量的比喻、拟人等修辞手法，将春天写得生机勃勃、充满诗意。
              在朗读时，请注意语气的轻重缓急，体会作者对春天的热爱之情。
            </p>
          </div>

          <ReadingTask
            title="朗读练习：《春》（节选）"
            content={`盼望着，盼望着，东风来了，春天的脚步近了。

一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。

小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。

桃树、杏树、梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味儿；闭了眼，树上仿佛已经满是桃儿、杏儿、梨儿。花下成千成百的蜜蜂嗡嗡地闹着，大小的蝴蝶飞来飞去。`}
            onComplete={() => handleTaskComplete(0, '朗读完成')}
          />
        </section>

        {/* 任务驱动 */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4 text-gray-800">✍️ 任务驱动</h2>
          <div className="space-y-6">
            <TodoTask
              taskNumber={1}
              instruction="请找出文中你最喜欢的三个句子，并说明理由。"
              placeholder="例如：我最喜欢"小草偷偷地从土里钻出来"这句话，因为..."
              onComplete={(content) => handleTaskComplete(1, content)}
            />

            <TodoTask
              taskNumber={2}
              instruction="文中运用了哪些修辞手法？请举例说明其表达效果。"
              placeholder="例如：文中运用了拟人的修辞手法，如..."
              onComplete={(content) => handleTaskComplete(2, content)}
            />

            <TodoTask
              taskNumber={3}
              instruction="仿照《春》的写法，用"添枝加叶法"描写一个季节的景色（不少于100字）。"
              placeholder="请开始你的创作..."
              onComplete={(content) => handleTaskComplete(3, content)}
            />
          </div>
        </section>

        {/* 课后任务 */}
        <section className="mb-8">
          <div className="bg-amber-50 rounded-xl p-6 shadow-md border-l-4 border-amber-500">
            <h2 className="text-xl mb-3 text-gray-800">🏡 课后任务</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>课后继续阅读朱自清的其他散文作品，如《荷塘月色》《背影》等。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>在生活中观察大自然的变化，尝试用学到的描写方法记录下来。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>收集更多描写自然景物的优美词句，建立自己的素材库。</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
