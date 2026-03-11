import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Play,
  Pause,
  Volume2,
  CheckCircle,
  Mic,
  Square,
  MessageCircleQuestion,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { units } from "../data/units";
import LessonAppreciation from "./LessonAppreciation";
import LessonActivity from "./LessonActivity";
import LessonExchange from "./LessonExchange";
import { AIAssistantModal } from "../components/AIAssistantModal";

export default function Lesson1() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 任务状态管理
  const [activeTask, setActiveTask] = useState<number | null>(
    null,
  );
  const [isTaskRecording, setIsTaskRecording] = useState(false);
  const [task1Annotation, setTask1Annotation] = useState("");
  const [task2Text, setTask2Text] = useState("");
  const [task1Submitted, setTask1Submitted] = useState(false);
  const [task2Submitted, setTask2Submitted] = useState(false);

  // 读后交流与 AI 助手状态
  const [activeDiscussion, setActiveDiscussion] = useState<
    number | null
  >(1);
  const [discussionTexts, setDiscussionTexts] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
  });
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [currentAiTarget, setCurrentAiTarget] = useState<1 | 2>(1);

  // 查找当前单元和课程
  const unit = units.find((u) => u.id === Number(unitId));
  const lesson = unit?.lessons.find(
    (l) => l.id === Number(lessonId),
  );

  const handleTaskSubmit = (taskId: number) => {
    if (taskId === 1) {
      setTask1Submitted(true);
      setIsTaskRecording(false);
    } else {
      setTask2Submitted(true);
    }
    setActiveTask(null);
  };

  const toggleTaskRecording = () => {
    setIsTaskRecording(!isTaskRecording);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // 静默处理错误，避免在不支持音频的环境中报错
          // 并在几秒后重置状态以模拟音频结束
          setTimeout(() => {
            setIsPlaying(false);
          }, 8000);
        });
      }
    }
  };

  // 如果单元或课程不存在，显示错误页面
  if (!unit || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900">
            课程未找到
          </h2>
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

  // 如果是美文欣赏类型，使用专门的组件
  if (lesson.type === "appreciation") {
    return <LessonAppreciation />;
  }

  // 如果是活动类型，使用活动组件
  if (lesson.type === "activity") {
    return <LessonActivity />;
  }

  // 如果是交流类型，使用交流组件
  if (lesson.type === "exchange") {
    return <LessonExchange />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/unit/${unitId}`)}
          className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回课时列表
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-amber-200 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
                {lesson.title}
              </h1>
              <p className="text-amber-700">
                {unit.title} · {lesson.description}
              </p>
            </div>
            {lesson.completed && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  已完成
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Learning Guide */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-blue-200 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-900">
              学习指引
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            品读名家关于自然的美文，领会其主旨与情感，学习"语言风格借鉴法"和"添枝加叶法"。
            通过深度阅读，体会作者如何运用生动的语言描绘自然景物，感受文字背后的情感与意境。
          </p>
        </section>

        {/* Classic Reading Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-green-200 mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">
            名著导读
          </h2>

          {/* Reading Guide */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-green-800 mb-2">
              阅读指引：
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              请认真阅读汪曾祺的名作《人间草木》，注意把握文章闲适淡雅的情感基调和生动细腻的语言特点。
              点击下方“朗读”按钮，伴随名家声音，感受文字的韵味。
            </p>
          </div>

          {/* Reading Content with Audio */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-green-900">
                《人间草木》节选 - 汪曾祺
              </h3>

              <audio
                ref={audioRef}
                src="https://www.soundhelix.com/architecture/mp3-player/SoundHelix-Song-1.mp3"
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              <button
                onClick={togglePlayback}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isPlaying
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    暂停
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    朗读
                  </>
                )}
              </button>
            </div>

            {isPlaying && (
              <div className="mb-4 bg-amber-100 border border-amber-300 rounded-lg p-3 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
                <span className="text-amber-800 font-medium">
                  正在朗读音频中...
                </span>
              </div>
            )}

            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p className="indent-8">
                如果你来访我，我不在，请和我门外的花坐一会儿，它们很温暖，我注视它们很多很多日子了。
                它们开得不茂盛，想起来什么颜色就在秋天或春天开起一两朵。我是个不讲究种花的人。
                我只随便插活了一两棵。
              </p>
              <p className="indent-8">
                都说梨花像雪，其实苹果花才像雪。雪是厚重的，不是透明的。梨花像什么呢？——梨花的瓣子是月亮做的。
                那一年，花开得很迟。我是五月二日到的，这地方的杏花、桃花都已经谢了，只有几棵秋海棠开得正好。
                我每天到这几棵海棠树下来看一看。这花是看花海棠，不结海棠果。这种海棠我从来没有见过，花瓣是单瓣的，花开得很大，像小酒杯似的，粉红色的。我觉得这才是海棠。
              </p>
            </div>
          </div>
        </section>

        {/* Task-Driven Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-purple-200">
          <h2 className="text-xl font-bold text-purple-900 mb-6">
            任务驱动
          </h2>
          <div className="space-y-6">
            {/* Task 1 */}
            <div
              className={`bg-purple-50 rounded-xl overflow-hidden border-2 transition-all ${activeTask === 1 ? "border-purple-400 shadow-md" : "border-purple-100 hover:border-purple-300"}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-purple-900">
                    任务一：读一读汪曾祺的“草木情”
                  </h3>
                  {task1Submitted && (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> 已完成
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  古人云“读万卷书不如行万里路”，而读《人间草木》，就像是与一个可爱的老头走在田间地头，路过弄堂胡同，陪着他去拜访老友，和他一同品尝各地美食，听他娓娓叙说
                  “人间草木”，回头发现，竟已踏遍万水千山……
                </p>
                <div className="bg-purple-100/50 p-3 rounded-lg border border-purple-200 mb-4">
                  <p className="text-purple-800 text-sm font-medium">
                    重点阅读《人间草木》中“一果一蔬”和“季节的供养”两辑，感受作者寄托在花、
                    树、虫、鱼、鸟、兽、四季果园中的情思，并做批注。
                  </p>
                </div>

                {activeTask !== 1 && (
                  <button
                    onClick={() => setActiveTask(1)}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
                  >
                    开始任务 <Play className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Task 1 Interactive Area */}
              {activeTask === 1 && (
                <div className="bg-white p-5 border-t border-purple-100 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="bg-orange-50/50 p-4 rounded-lg mb-4 text-sm text-gray-800 leading-relaxed border border-orange-100 h-64 overflow-y-auto">
                    <h4 className="font-bold text-center text-lg mb-4 text-orange-900">
                      《人间草木》节选（一果一蔬/季节的供养）
                    </h4>
                    <p className="indent-8 mb-3">
                      西瓜以绳络悬之井中，下午剖食，一刀下去，喀嚓有声，凉气四溢，连眼睛都是凉的。
                    </p>
                    <p className="indent-8 mb-3">
                      秋海棠的叶子一面是绿的，一面是红的。这花开得很繁，花瓣有些像小莲花，不过是粉红的。
                    </p>
                    <p className="indent-8 mb-3">
                      葡萄抽条，长叶，开花，结果，成熟，都是悄悄的。葡萄熟了，果园里充满了香气。葡萄的香气是很奇特的，有的像玫瑰，有的像香蕉。那是真正的果香。
                    </p>
                    <p className="indent-8 mb-3">
                      枸杞子红了。秋天，树叶落了，只剩下这些红豆豆，很鲜艳。枸杞子可以泡水喝，也可以嚼着吃。有点甜。
                    </p>
                    <p className="indent-8">
                      花总是要开的。不管是不是有人看，不管你是不是心情好。
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-purple-800">
                      你的批注：
                    </span>
                    <button
                      onClick={toggleTaskRecording}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isTaskRecording
                          ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          : "bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100"
                      }`}
                    >
                      {isTaskRecording ? (
                        <>
                          <Square className="w-3.5 h-3.5" />{" "}
                          停止录音
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5" />{" "}
                          开始录音
                        </>
                      )}
                    </button>
                  </div>

                  {isTaskRecording && (
                    <div className="mb-3 flex items-center gap-2 text-xs text-red-500 bg-red-50/50 p-2 rounded">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      正在录制朗读...
                    </div>
                  )}

                  <textarea
                    value={task1Annotation}
                    onChange={(e) =>
                      setTask1Annotation(e.target.value)
                    }
                    placeholder="在此输入你对文章的批注和感悟..."
                    className="w-full h-32 p-3 mb-4 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none resize-none text-sm"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveTask(null)}
                      className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                    >
                      收起
                    </button>
                    <button
                      onClick={() => handleTaskSubmit(1)}
                      disabled={!task1Annotation.trim()}
                      className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      提交任务
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Task 2 */}
            <div
              className={`bg-purple-50 rounded-xl overflow-hidden border-2 transition-all ${activeTask === 2 ? "border-purple-400 shadow-md" : "border-purple-100 hover:border-purple-300"}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-purple-900">
                    任务二：品一品汪曾祺的文字
                  </h3>
                  {task2Submitted && (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> 已完成
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  汪曾祺的文字给人一种舒服、有趣的感觉。“舒服”在于他的语言质朴、自然、温
                  润、亲切；“有趣”在于他很擅长描写，其文字的画面感极强，还穿插有许多童年生活故
                  事、民间谚俗、奇闻趣事等，十分丰富而生动。
                </p>
                <div className="bg-purple-100/50 p-3 rounded-lg border border-purple-200 mb-4">
                  <p className="text-purple-800 text-sm font-medium">
                    反复朗读你欣赏的语段，选择一段模仿练习，描绘一下身边的花草树木或虫鱼鸟兽。
                  </p>
                </div>

                {activeTask !== 2 && (
                  <button
                    onClick={() => setActiveTask(2)}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
                  >
                    开始任务 <Play className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Task 2 Interactive Area */}
              {activeTask === 2 && (
                <div className="bg-white p-5 border-t border-purple-100 animate-in fade-in slide-in-from-top-4 duration-300">
                  <span className="block text-sm font-bold text-purple-800 mb-2">
                    你的仿写：
                  </span>
                  <textarea
                    value={task2Text}
                    onChange={(e) =>
                      setTask2Text(e.target.value)
                    }
                    placeholder="参考汪曾祺的风格，在这里描绘你身边的自然景物..."
                    className="w-full h-40 p-3 mb-4 border border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none resize-none text-sm leading-relaxed"
                  />

                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4 px-1">
                    <span>当前字数：{task2Text.length}</span>
                    <span>建议字数：100-300字</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveTask(null)}
                      className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                    >
                      收起
                    </button>
                    <button
                      onClick={() => handleTaskSubmit(2)}
                      disabled={!task2Text.trim()}
                      className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      提交仿写
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Post-reading Discussion Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-indigo-200 mt-8 mb-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircleQuestion className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-indigo-900">
              课后任务
            </h2>
          </div>
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-xl overflow-hidden border-2 border-indigo-100 p-5 shadow-sm">
              <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <span className="text-indigo-500 font-black">
                  任务：
                </span>
                阅读《人间草木》
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                请在课后仔细阅读汪曾祺先生的散文集《人间草木》，感受作者平实质朴、形象生动、风趣幽默的语言风格，体会其笔下的“草木情”。
              </p>
            </div>
          </div>
        </section>

        {/* AI Assistant Chat Modal Instance */}
        <AIAssistantModal 
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          onInsert={(text) => {
            setDiscussionTexts((prev) => ({
              ...prev,
              [currentAiTarget]: prev[currentAiTarget] + (prev[currentAiTarget] ? "\n" : "") + text,
            }));
            setIsAIOpen(false);
          }}
        />
      </div>
    </div>
  );
}