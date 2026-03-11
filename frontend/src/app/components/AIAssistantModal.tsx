import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Bot, User, PlusCircle } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
  title?: string;
  initialMessage?: string;
}

export function AIAssistantModal({ 
  isOpen, 
  onClose, 
  onInsert, 
  title = "AI伴学助手",
  initialMessage = "同学你好！我是你的文学伴学小助手。在写读后交流时遇到困难了吗？别急，我们一起探讨一下。你现在对哪个话题比较感兴趣，或者想从哪里开始写起呢？"
}: AIAssistantModalProps) {
  const [messages, setMessages] = useState<{role: 'ai'|'user', content: string}[]>([
    { role: 'ai', content: initialMessage }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // 重置状态当弹窗打开时，保持初始消息
  useEffect(() => {
    if (isOpen && messages.length === 1 && messages[0].content !== initialMessage) {
       setMessages([{ role: 'ai', content: initialMessage }]);
    }
  }, [isOpen, initialMessage, messages.length]);


  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsLoading(true);

    // 模拟苏格拉底式AI回复
    setTimeout(() => {
      let aiReply = "这很有意思。";
      const userText = userMsg.toLowerCase();

      if (
        userText.includes("喜欢") ||
        userText.includes("理由") ||
        userText.includes("烟火气")
      ) {
        aiReply =
          "你提到了自己喜欢的地方。能具体说说，是汪曾祺先生描写的哪个细节打动了你吗？比如他对食物的描写，还是对花草的观察？这些细节是如何体现出“人间烟火气”的？";
      } else if (
        userText.includes("不觉得") ||
        userText.includes("没有") ||
        userText.includes("不懂")
      ) {
        aiReply =
          "没关系，这很正常。就像汪曾祺笔下的栀子花一样‘香得掸都掸不开’。有时候作者的感情就是这么直接和浓烈。你可以试着回忆一下，生活中有什么东西也是这样让你觉得‘就是这样，没什么大不了’的？这也许就是他所说的质朴。";
      } else if (
        userText.includes("不知道") ||
        userText.includes("不会") ||
        userText.includes("怎么写")
      ) {
        aiReply =
          "别担心，我们一步步来。如果你要向一个没读过这篇文章的朋友介绍《人间草木》，你会用哪三个词来形容它？你觉得这些词是如何体现出他对大自然的热爱的？";
      } else {
        aiReply = "关于你的想法，你可以尝试结合文章中具体的句子或者段落来阐述。例如，你可以引用他描写花鸟虫鱼的片段，来佐证你的观点。";
      }
      
      setMessages(prev => [...prev, { role: 'ai', content: aiReply }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col bottom-6 right-6 h-[500px]"
        >
          {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 border-b border-indigo-100">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold">{title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-indigo-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-indigo-50/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] space-y-2`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-purple-600 text-white rounded-tr-sm' 
                        : 'bg-white text-gray-700 shadow-sm border border-indigo-100/50 rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.role === 'ai' && idx > 0 && (
                      <div className="flex gap-2 justify-start">
                        <button 
                          onClick={() => onInsert(msg.content)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-xs font-medium transition-colors border border-indigo-100"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          将建议应用到笔记
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-indigo-100/50 flex gap-1 items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-indigo-100">
              <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-300 transition-all">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="遇到困难了？聊聊..."
                  className="flex-1 bg-transparent px-2 py-1.5 focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}