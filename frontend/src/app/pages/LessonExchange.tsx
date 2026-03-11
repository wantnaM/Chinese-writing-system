import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MessageCircleQuestion, Send, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";
import { units } from "../data/units";
import { AIAssistantModal } from "../components/AIAssistantModal";

export default function LessonExchange() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();

  // 状态管理
  const [discussionTexts, setDiscussionTexts] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
  });
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [currentAiTarget, setCurrentAiTarget] = useState<1 | 2>(1);

  // 查找当前单元和课程
  const unit = units.find((u) => u.id === Number(unitId));
  const lesson = unit?.lessons.find((l) => l.id === Number(lessonId));

  if (!unit || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900">课程未找到</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/unit/${unitId}`)}
          className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回课时列表
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-indigo-200 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-2">
                {lesson.title}
              </h1>
              <p className="text-indigo-700">
                {unit.title} · {lesson.description}
              </p>
            </div>
            {lesson.completed && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">已完成</span>
              </div>
            )}
          </div>
        </div>

        {/* Post-reading Discussion Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-indigo-200 mb-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircleQuestion className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-indigo-900">
              读后交流
            </h2>
          </div>
          <div className="space-y-6">
            {/* Discussion Topic 1 */}
            <div className="bg-indigo-50 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-sm">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-indigo-900 flex gap-2">
                    <span className="text-indigo-500 font-black">1.</span>
                    汪曾祺笔下的一草一木，都很天真、质朴，透出勃勃生机。《人间草木》流露着亲切的人间烟火气，读完这本书，跟自然握握手，去感受身边的自然万物，谈谈你的“草木情”吧。
                  </h3>
                </div>
                
                <div className="bg-white p-5 border border-indigo-100 rounded-lg">
                  <textarea
                    value={discussionTexts[1]}
                    onChange={(e) =>
                      setDiscussionTexts((prev) => ({
                        ...prev,
                        1: e.target.value,
                      }))
                    }
                    placeholder="在此输入你的想法..."
                    className="w-full h-32 p-3 mb-4 border border-gray-200 rounded-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none resize-none text-sm"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setCurrentAiTarget(1);
                        setIsAIOpen(true);
                      }}
                      className="flex items-center gap-2 py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg transition-colors text-sm border border-indigo-200"
                    >
                      <Sparkles className="w-4 h-4" /> 求助伴学AI
                    </button>
                    <button
                      disabled={!discussionTexts[1].trim()}
                      className="flex items-center gap-2 py-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      <Send className="w-4 h-4" /> 发布交流
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Topic 2 */}
            <div className="bg-indigo-50 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-sm">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-indigo-900 flex gap-2">
                    <span className="text-indigo-500 font-black">2.</span>
                    汪曾祺被誉为“中国最后一个纯粹的文人，中国最后一个士大夫”。不论是娓娓道来的凡人小事，还是自然流露的乡情，甚至是各有性情的花鸟虫鱼，他总能即兴偶感，于不经心、不刻意中用传神妙笔成就当代小品文的经典。人间草木，平中有奇，淡中有味。细细品读汪曾祺的文字，思考描画自然的方法，谈谈你的收获。
                  </h3>
                </div>

                <div className="bg-white p-5 border border-indigo-100 rounded-lg">
                  <textarea
                    value={discussionTexts[2]}
                    onChange={(e) =>
                      setDiscussionTexts((prev) => ({
                        ...prev,
                        2: e.target.value,
                      }))
                    }
                    placeholder="在此输入你的想法..."
                    className="w-full h-32 p-3 mb-4 border border-gray-200 rounded-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none resize-none text-sm"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setCurrentAiTarget(2);
                        setIsAIOpen(true);
                      }}
                      className="flex items-center gap-2 py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg transition-colors text-sm border border-indigo-200"
                    >
                      <Sparkles className="w-4 h-4" /> 求助伴学AI
                    </button>
                    <button
                      disabled={!discussionTexts[2].trim()}
                      className="flex items-center gap-2 py-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      <Send className="w-4 h-4" /> 发布交流
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onInsert={(text) => {
          setDiscussionTexts((prev) => ({
            ...prev,
            [currentAiTarget]: prev[currentAiTarget] + text,
          }));
        }}
      />
    </div>
  );
}
