import { DailyPoem } from '../components/DailyPoem';
import { BadgeWall } from '../components/BadgeWall';
import { UnitBook } from '../components/UnitBook';
import { units, badges } from '../data/units';
import { BookOpen } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-gray-800">语文一体化写作系统</h1>
              <p className="text-sm text-gray-600">以读促写，助力成长</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 上半部分 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <DailyPoem />
          <BadgeWall badges={badges} />
        </div>

        {/* 下半部分 - 单元网格 */}
        <section>
          <h2 className="text-2xl mb-6 text-gray-800">学习单元</h2>
          <div className="grid grid-cols-4 gap-6">
            {units.map((unit) => (
              <UnitBook key={unit.id} unit={unit} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
