import { useState } from 'react';
import { Highlighter, MessageSquare, X } from 'lucide-react';

interface Annotation {
  id: string;
  text: string;
  note: string;
  color: string;
}

interface AnnotationReaderProps {
  title: string;
  content: string[];
}

export function AnnotationReader({ title, content }: AnnotationReaderProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [highlightColor, setHighlightColor] = useState('#fef08a');

  const colors = [
    { name: '黄色', value: '#fef08a' },
    { name: '绿色', value: '#bbf7d0' },
    { name: '蓝色', value: '#bfdbfe' },
    { name: '粉色', value: '#fbcfe8' },
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 0) {
      setSelectedText(text);
      setShowNoteInput(true);
    }
  };

  const addAnnotation = () => {
    if (selectedText) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        text: selectedText,
        note: noteContent,
        color: highlightColor,
      };
      setAnnotations([...annotations, newAnnotation]);
      setSelectedText('');
      setNoteContent('');
      setShowNoteInput(false);
    }
  };

  const removeAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
  };

  const getHighlightedContent = (paragraph: string) => {
    let highlightedParagraph = paragraph;
    annotations.forEach(annotation => {
      if (paragraph.includes(annotation.text)) {
        highlightedParagraph = highlightedParagraph.replace(
          annotation.text,
          `<mark style="background-color: ${annotation.color}; padding: 2px 0;">${annotation.text}</mark>`
        );
      }
    });
    return highlightedParagraph;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl mb-2">{title}</h2>
        <div className="flex items-center gap-4 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <Highlighter className="w-4 h-4" />
            选中文字进行标注
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            添加批注
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* 阅读区域 */}
        <div className="col-span-2">
          <div 
            className="prose max-w-none"
            onMouseUp={handleTextSelection}
          >
            {content.map((paragraph, index) => (
              <p 
                key={index} 
                className="mb-4 leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: getHighlightedContent(paragraph) }}
              />
            ))}
          </div>
        </div>

        {/* 批注侧栏 */}
        <div className="space-y-4">
          {showNoteInput && (
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm text-gray-800">添加批注</h4>
                <button onClick={() => setShowNoteInput(false)}>
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">选中文字:</p>
                <p className="text-sm bg-white p-2 rounded border">{selectedText}</p>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">高亮颜色:</p>
                <div className="flex gap-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setHighlightColor(color.value)}
                      className={`w-8 h-8 rounded border-2 ${
                        highlightColor === color.value ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="写下你的理解和感悟..."
                className="w-full min-h-20 p-2 border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <button
                onClick={addAnnotation}
                className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
              >
                保存批注
              </button>
            </div>
          )}

          <div>
            <h4 className="text-sm text-gray-600 mb-3">我的批注 ({annotations.length})</h4>
            <div className="space-y-3">
              {annotations.map(annotation => (
                <div key={annotation.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex items-start justify-between mb-2">
                    <p 
                      className="flex-1 font-medium"
                      style={{ 
                        backgroundColor: annotation.color,
                        padding: '2px 4px',
                        borderRadius: '2px'
                      }}
                    >
                      {annotation.text}
                    </p>
                    <button onClick={() => removeAnnotation(annotation.id)}>
                      <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                  {annotation.note && (
                    <p className="text-gray-600 text-xs mt-2 pl-2 border-l-2 border-gray-300">
                      {annotation.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
