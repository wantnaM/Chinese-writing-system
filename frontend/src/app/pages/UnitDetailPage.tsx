import { useParams, Link } from 'react-router';
import { units } from '../data/units';
import { LessonCard } from '../components/LessonCard';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export function UnitDetailPage() {
  const { unitId } = useParams();
  const unit = units.find(u => u.id === Number(unitId));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (unitId) {
      const saved = localStorage.getItem(`unit-${unitId}-completed`);
      if (saved) {
        setCompletedLessons(new Set(JSON.parse(saved)));
      }
    }
  }, [unitId]);

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-800 mb-4">单元不存在</h2>
          <Link to="/" className="text-blue-600 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 头部 */}
      <header 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${unit.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-between py-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
          
          <div className="text-white">
            <h1 className="text-4xl mb-3">{unit.title}</h1>
            <p className="text-lg opacity-90">{unit.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                共 {unit.lessons.length} 课时
              </span>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                已完成 {completedLessons.size}/{unit.lessons.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 课时列表 */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl mb-6 text-gray-800">课程列表</h2>
        <div className="grid grid-cols-3 gap-6">
          {unit.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              unitId={unit.id}
              isCompleted={completedLessons.has(`${unit.id}-${lesson.id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
