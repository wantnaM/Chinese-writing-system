import { useState } from 'react';
import { Save } from 'lucide-react';

interface CompositionPaperProps {
  title?: string;
  placeholder?: string;
  onSave?: (content: string) => void;
}

export function CompositionPaper({ title, placeholder, onSave }: CompositionPaperProps) {
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // 计算字数
  const charCount = content.length;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* 作文本头部 */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{title || '作文练习'}</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm">字数: {charCount}</span>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              {saved ? '已保存' : '保存'}
            </button>
          </div>
        </div>
      </div>

      {/* 作文本主体 - 网格背景 */}
      <div className="p-8 relative">
        {/* 网格背景 */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                #e5e7eb 0px,
                #e5e7eb 1px,
                transparent 1px,
                transparent 30px
              ),
              repeating-linear-gradient(
                90deg,
                #e5e7eb 0px,
                #e5e7eb 1px,
                transparent 1px,
                transparent 30px
              )
            `,
            backgroundSize: '30px 30px',
            opacity: 0.5
          }}
        />

        {/* 红线 - 竖线 */}
        <div 
          className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-300 pointer-events-none"
          style={{ opacity: 0.5 }}
        />

        {/* 输入区域 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder || '请开始你的创作...'}
          className="relative w-full min-h-[600px] p-4 pl-16 bg-transparent border-none resize-none focus:outline-none text-gray-800 leading-[30px]"
          style={{
            fontFamily: '"KaiTi", "STKaiti", "楷体", serif',
            fontSize: '18px',
            lineHeight: '30px'
          }}
        />
      </div>

      {/* 底部提示 */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          提示: 注意段落层次，使用恰当的修辞手法，表达真情实感
        </p>
      </div>
    </div>
  );
}
