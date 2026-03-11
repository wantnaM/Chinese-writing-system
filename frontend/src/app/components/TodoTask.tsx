import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface TodoTaskProps {
  taskNumber: number;
  instruction: string;
  placeholder?: string;
  onComplete?: (content: string) => void;
}

export function TodoTask({ taskNumber, instruction, placeholder, onComplete }: TodoTaskProps) {
  const [content, setContent] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    if (content.trim()) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(content);
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all ${
      isCompleted ? 'border-green-500 bg-green-50' : 'border-transparent'
    }`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-100" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-lg text-gray-800 mb-2">任务{taskNumber}</h4>
          <p className="text-sm text-gray-600 mb-4">{instruction}</p>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder || "请输入你的答案..."}
            disabled={isCompleted}
            className={`w-full min-h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isCompleted ? 'bg-gray-50 text-gray-700' : 'bg-white'
            }`}
          />
          
          {!isCompleted && (
            <button
              onClick={handleComplete}
              disabled={!content.trim()}
              className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              完成任务
            </button>
          )}
          
          {isCompleted && (
            <button
              onClick={() => setIsCompleted(false)}
              className="mt-3 px-6 py-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              编辑答案
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
