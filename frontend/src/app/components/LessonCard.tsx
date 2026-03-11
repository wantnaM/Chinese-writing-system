import { Lesson } from '../data/units';
import { Link } from 'react-router';
import { CheckCircle2, BookOpen, Heart, Camera, PenTool } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  unitId: number;
  isCompleted: boolean;
}

export function LessonCard({ lesson, unitId, isCompleted }: LessonCardProps) {
  const getIcon = () => {
    switch (lesson.type) {
      case 'reading':
        return <BookOpen className="w-6 h-6" />;
      case 'appreciation':
        return <Heart className="w-6 h-6" />;
      case 'activity':
        return <Camera className="w-6 h-6" />;
      case 'writing':
        return <PenTool className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const getColor = () => {
    switch (lesson.type) {
      case 'reading':
        return 'from-blue-500 to-blue-600';
      case 'appreciation':
        return 'from-pink-500 to-rose-600';
      case 'activity':
        return 'from-purple-500 to-purple-600';
      case 'writing':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  // 根据课程ID路由到不同页面
  const getLessonPath = () => {
    if (lesson.id === 1) return `/unit/${unitId}/lesson/1`;
    if (lesson.id === 2) return `/unit/${unitId}/lesson/2`;
    if (lesson.id === 3) return `/unit/${unitId}/lesson/3`;
    if (lesson.id === 7) return `/unit/${unitId}/lesson/7`;
    return `/unit/${unitId}/lesson/${lesson.id}`;
  };

  return (
    <Link to={getLessonPath()} className="group block">
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        {/* 完成标记 */}
        {isCompleted && (
          <div className="absolute top-3 right-3 z-10">
            <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />
          </div>
        )}
        
        {/* 渐变头部 */}
        <div className={`h-20 bg-gradient-to-r ${getColor()} flex items-center justify-center text-white`}>
          {getIcon()}
        </div>
        
        {/* 内容 */}
        <div className="p-5">
          <h4 className="text-lg mb-2 text-gray-800">{lesson.title}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
        </div>
        
        {/* 底部装饰 */}
        <div className={`h-1 bg-gradient-to-r ${getColor()}`} />
      </div>
    </Link>
  );
}
