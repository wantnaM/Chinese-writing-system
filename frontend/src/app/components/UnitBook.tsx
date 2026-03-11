import { Unit } from '../data/units';
import { Link } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UnitBookProps {
  unit: Unit;
}

export function UnitBook({ unit }: UnitBookProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem(`unit-${unit.id}-completed`);
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, [unit.id]);

  const isCompleted = unit.lessons.every(lesson => 
    completedLessons.has(`${unit.id}-${lesson.id}`)
  );

  return (
    <Link to={`/unit/${unit.id}`} className="group block">
      <div className="relative perspective-1000">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
          {/* 书脊效果 */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-gray-400 to-gray-300" />
          
          {/* 完成标记 */}
          {isCompleted && (
            <div className="absolute top-2 right-2 z-10">
              <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />
            </div>
          )}
          
          {/* 封面图片 */}
          <div className="h-48 overflow-hidden">
            <img 
              src={unit.image} 
              alt={unit.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          {/* 书籍信息 */}
          <div className="p-5 pl-6">
            <h3 className="text-lg mb-2 text-gray-800">{unit.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{unit.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">{unit.lessons.length} 课时</span>
              <span className="text-xs text-blue-600">
                {completedLessons.size}/{unit.lessons.length}
              </span>
            </div>
          </div>
          
          {/* 书页效果 */}
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-l from-gray-200 to-transparent" />
        </div>
      </div>
    </Link>
  );
}
