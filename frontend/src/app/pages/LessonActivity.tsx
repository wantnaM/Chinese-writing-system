import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Image as ImageIcon, UploadCloud, Edit3, Map, CheckCircle, ChevronRight, PlayCircle, Flag, Sparkles, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { units } from '../data/units';
import { motion } from 'motion/react';
import { AIAssistantModal } from '../components/AIAssistantModal';

export default function LessonActivity() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [compositionText, setCompositionText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 新增状态
  const [learningNotes, setLearningNotes] = useState("");
  const [isTaskSubmitting, setIsTaskSubmitting] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // 评价表分数状态 (9个评价项, 6个展示小组)
  const [scores, setScores] = useState<(number | '')[][]>(Array(9).fill(0).map(() => Array(6).fill('')));

  const handleScoreChange = (row: number, col: number, value: string, maxScore: number) => {
    let numValue: number | '' = value === '' ? '' : Number(value);
    // 限制输入不能超过满分或小于0
    if (numValue !== '' && numValue > maxScore) numValue = maxScore;
    if (numValue !== '' && numValue < 0) numValue = 0;
    
    const newScores = scores.map(r => [...r]);
    newScores[row][col] = numValue;
    setScores(newScores);
  };

  const calculateTotal = (col: number) => {
    return scores.reduce((sum, row) => sum + (row[col] === '' ? 0 : Number(row[col])), 0);
  };

  // 查找当前单元和课程
  const unit = units.find(u => u.id === Number(unitId));
  const theme = unit?.themes.find(t => t.id === 2);

  const handleTaskSubmit = () => {
    if (isTaskSubmitting || isTaskCompleted) return;
    setIsTaskSubmitting(true);
    setTimeout(() => {
      setIsTaskSubmitting(false);
      setIsTaskCompleted(true);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  if (!unit || !theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900">课程未找到</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const nodes = [
    // { id: 'start', label: '开始', icon: PlayCircle, color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-300' },
    { id: 'step1', label: '拍羊城秋色', icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-300' },
    { id: 'step2', label: '写羊城秋色', icon: Edit3, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-300' },
    { id: 'step3', label: '展羊城秋色', icon: Map, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300' },
    // { id: 'end', label: '总结', icon: Flag, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/unit/${unitId}`)}
          className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回主题列表
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-indigo-200 mb-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-2">{theme.title}</h1>
              <p className="text-indigo-700">{unit.title} · {theme.description}</p>
            </div>
            {theme.completed && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">已完成</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Activity Flow (Mermaid Style) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-blue-200 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Map className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-900">活动流程</h2>
          </div>
          
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center w-full py-4 space-y-4 md:space-y-0 md:gap-y-6">
            {nodes.map((node, index) => (
              <div key={node.id} className="flex flex-col md:flex-row items-center flex-shrink-0">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 ${node.bg} ${node.border} shadow-sm`}
                >
                  <node.icon className={`w-5 h-5 ${node.color}`} />
                  <span className={`font-medium ${node.color}`}>{node.label}</span>
                </motion.div>
                {index < nodes.length - 1 && (
                  <>
                    <div className="hidden md:flex items-center justify-center w-8 mx-2 text-blue-300">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                    <div className="flex md:hidden items-center justify-center h-8 my-2 text-blue-300">
                      <ChevronRight className="w-6 h-6 rotate-90" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Task 1: 拍羊城秋色 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-green-200 mb-8"
        >
          <h2 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            📸 拍羊城秋色
            {isTaskCompleted && (
              <span className="ml-auto text-sm bg-green-500 text-white px-3 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                已提交
              </span>
            )}
          </h2>

          <div className="space-y-6">
            {/* Sub-task 1 */}
            <div className="bg-green-50 rounded-xl overflow-hidden border-2 border-green-100 p-5">
              <h3 className="text-lg font-bold text-green-900 mb-3">
                任务一：学习摄影技巧
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                <strong>说明：</strong>摄影是一门艺术，也是一门学问。想要拍好照片，可从取景、构图、光影等方面着手，如留白取景，对称式构图、框架式构图、前景式构图、三分法等构图技巧，逆光、柔光、冷暖光、光线投影、控制曝光等光影技巧。你可以在网上搜索了解摄影的基本技巧，可以学习一些摄影入门的课程，还可以请教艺术老师或者摄影爱好者等。
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm relative group">
                <textarea
                  value={learningNotes}
                  onChange={(e) => setLearningNotes(e.target.value)}
                  disabled={isTaskCompleted}
                  placeholder="记录下你学到的摄影技巧或心得体会..."
                  className="w-full h-32 p-3 bg-transparent resize-none focus:outline-none text-gray-700 text-sm placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50/50"
                ></textarea>
              </div>
            </div>

            {/* Sub-task 2 */}
            <div className="bg-green-50 rounded-xl overflow-hidden border-2 border-green-100 p-5">
              <h3 className="text-lg font-bold text-green-900 mb-3">
                任务二：拍摄羊城秋色
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                <strong>说明：</strong>秋天的羊城处处展现着其独特的魅力：帽峰山的枫叶、华南植物园的奇花异草、天河公园的落羽杉、路旁的异木棉，还有大街小巷随处可见的杜鹃花、紫荆花、风铃木……漫步羊城，寻觅秋色，运用你学到的摄影技巧，用镜头来捕捉独特的羊城秋色吧。
              </p>

              {!uploadedImage ? (
                <div 
                  onClick={() => !isTaskCompleted && fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={(e) => !isTaskCompleted && handleDrop(e)}
                  className={`border-2 border-dashed border-green-300 rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors bg-white ${isTaskCompleted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-green-100/50'}`}
                >
                  <UploadCloud className="w-12 h-12 text-green-500 mb-3" />
                  <p className="text-green-700 font-medium text-lg">☁️ 拖拽上传照片，或点击选择</p>
                  <p className="text-green-500 text-sm mt-2">支持 JPG, PNG, GIF 格式</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                    disabled={isTaskCompleted}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-green-800 flex items-center gap-2 text-sm">
                      <ImageIcon className="w-4 h-4" /> 照片预览
                    </h4>
                    {!isTaskCompleted && (
                      <button 
                        onClick={() => setUploadedImage(null)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 bg-red-50 rounded-full"
                      >
                        重新上传
                      </button>
                    )}
                  </div>
                  <div className={`relative rounded-xl overflow-hidden border-4 border-white shadow-md bg-gray-100 aspect-video flex items-center justify-center ${!isTaskCompleted ? 'group' : ''}`}>
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded autumn scenery" 
                      className={`max-w-full max-h-full object-contain ${isTaskCompleted ? 'opacity-80' : ''}`}
                    />
                    {!isTaskCompleted && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-lg text-sm"
                        >
                          更换照片
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleTaskSubmit}
                disabled={isTaskSubmitting || isTaskCompleted}
                className={`flex items-center gap-2 px-6 py-2.5 text-white rounded-lg transition-colors shadow-sm font-medium hidden`}
              >
                {isTaskSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {isTaskSubmitting ? '提交中...' : isTaskCompleted ? '已提交' : '提交任务'}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Task 2: Writing */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-purple-200 mb-8"
        >
          <h2 className="text-xl font-bold text-purple-900 mb-6 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            ✍️ 写羊城秋色
            {isTaskCompleted && (
              <span className="ml-auto text-sm bg-purple-500 text-white px-3 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                已提交
              </span>
            )}
          </h2>
          
          <div className="space-y-6">
            {/* Sub-task 1 */}
            <div className="bg-purple-50 rounded-xl overflow-hidden border-2 border-purple-100 p-5">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                任务一：学习作文技法
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                学习“语言风格借鉴法”，细细品味平实质朴、形象生动、风趣幽默三种语言风格，并掌握它们的要点。
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-purple-200 shadow-sm relative group">
                <textarea
                  disabled={isTaskCompleted}
                  placeholder="记录下你学习作文技法的心得体会..."
                  className="w-full h-32 p-3 bg-transparent resize-none focus:outline-none text-gray-700 text-sm placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50/50"
                ></textarea>
              </div>
            </div>

            {/* Sub-task 2 */}
            <div className="bg-purple-50 rounded-xl overflow-hidden border-2 border-purple-100 p-5">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                任务二：写摄影作品配文
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                仿照朱自清《春》和老舍《济南的冬天》的写法，抓住羊城秋天的特点，从外形、色彩、声音等角度展开想象，选用一种语言风格，给摄影作品配上情景相融的文字。
              </p>
              
              <div className="relative">
                <textarea
                  value={compositionText}
                  onChange={(e) => setCompositionText(e.target.value)}
                  disabled={isTaskCompleted}
                  placeholder="对于一个在广州住惯的人，像我，秋天要是..."
                  className="w-full h-40 p-4 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none resize-none transition-all text-gray-700 leading-relaxed disabled:opacity-50 disabled:bg-gray-50/50"
                ></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-purple-400 font-medium">
                  {compositionText.length} 字
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Task 3: Exhibition */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-amber-200 mb-8"
        >
          <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            🖼️ 展羊城秋色
            {isTaskCompleted && (
              <span className="ml-auto text-sm bg-amber-500 text-white px-3 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                已提交
              </span>
            )}
          </h2>
          
          <div className="space-y-6">
            {/* Sub-task 1 */}
            <div className="bg-amber-50 rounded-xl overflow-hidden border-2 border-amber-100 p-5">
              <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                任务一：筹备“羊城之秋”摄影展
              </h3>
              
              <div className="text-gray-700 text-sm leading-relaxed mb-6 space-y-2">
                <p>1. <strong>学习摄影作品赏析小知识</strong>，以小组为单位，根据对作品的理解与分析，选择展现羊城秋色的摄影作品，并配文制作演示文稿。</p>
                <p>2. <strong>学习朗诵技巧</strong>，以小组为单位，选择朗诵形式（如独诵、双人诵、多人轮诵或多人齐诵等），并选出朗诵表演者和朗诵作品。</p>
                <p>3. <strong>成立布展小组</strong>，筹备“羊城之秋”摄影展。征集参展作品，根据作品主题、风格等，适当加入文字、音乐、道具、视频等辅助元素布置场地。</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border-2 border-amber-200 border-dashed shadow-sm">
                  <h4 className="font-bold text-amber-800 text-center mb-3 text-sm">💡 知识卡片：摄影作品赏析要点</h4>
                  <ul className="list-decimal pl-5 space-y-1.5 text-xs text-gray-700">
                    <li>构图美观新颖，主题突出。</li>
                    <li>色彩鲜明。彩色照片冷暖搭配得当；黑白照片对比明显，画面柔和。</li>
                    <li>光源运用恰当，能反映主体和内容。</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border-2 border-amber-200 border-dashed shadow-sm">
                  <h4 className="font-bold text-amber-800 text-center mb-3 text-sm">💡 知识卡片：朗诵技巧</h4>
                  <ul className="list-decimal pl-5 space-y-1.5 text-xs text-gray-700">
                    <li>注意朗诵的语气、语调、语速。</li>
                    <li>把握好重音、停连、节奏。</li>
                    <li>根据朗诵内容选择合适的配乐。</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm relative group">
                <textarea
                  disabled={isTaskCompleted}
                  placeholder="记录下你的筹备计划或分工安排..."
                  className="w-full h-32 p-3 bg-transparent resize-none focus:outline-none text-gray-700 text-sm placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50/50"
                ></textarea>
              </div>
            </div>

            {/* Sub-task 2 */}
            <div className="bg-amber-50 rounded-xl overflow-hidden border-2 border-amber-100 p-5">
              <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                任务二：举办“羊城之秋”摄影展
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                以小组为单位轮流展示作品。通过“羊城之秋”摄影展评价表评选出最佳作品。
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm overflow-x-auto">
                <h4 className="font-bold text-center text-amber-900 mb-4">“羊城之秋”摄影展评价表</h4>
                <div className="min-w-[600px]">
                  <table className="w-full text-xs sm:text-sm border-collapse border border-amber-200 text-center">
                    <thead>
                      <tr className="bg-amber-100/50 text-amber-900">
                        <th className="border border-amber-200 p-2 font-bold w-16" rowSpan={2}>评价项目</th>
                        <th className="border border-amber-200 p-2 font-bold w-16" rowSpan={2}>评价内容</th>
                        <th className="border border-amber-200 p-2 font-bold" rowSpan={2}>评价要点</th>
                        <th className="border border-amber-200 p-2 font-bold w-12" rowSpan={2}>分值</th>
                        <th className="border border-amber-200 p-2 font-bold" colSpan={6}>展示小组</th>
                      </tr>
                      <tr className="bg-amber-100/50 text-amber-900">
                        <th className="border border-amber-200 p-1 font-medium w-8">1</th>
                        <th className="border border-amber-200 p-1 font-medium w-8">2</th>
                        <th className="border border-amber-200 p-1 font-medium w-8">3</th>
                        <th className="border border-amber-200 p-1 font-medium w-8">4</th>
                        <th className="border border-amber-200 p-1 font-medium w-8">5</th>
                        <th className="border border-amber-200 p-1 font-medium w-8">6</th>
                      </tr>
                    </thead>
                    <tbody className="text-left text-gray-700">
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium text-amber-900" rowSpan={3}>摄影<br/>作品</td>
                        <td className="border border-amber-200 p-2 text-center font-medium">内容</td>
                        <td className="border border-amber-200 p-2">风光独特，有意境。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">15</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`0-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="15" value={scores[0][col]} onChange={(e) => handleScoreChange(0, col, e.target.value, 15)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium">构图</td>
                        <td className="border border-amber-200 p-2">背景干净，主体突出；层次丰富，虚实相映，烘托主题。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">15</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`1-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="15" value={scores[1][col]} onChange={(e) => handleScoreChange(1, col, e.target.value, 15)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium">光影</td>
                        <td className="border border-amber-200 p-2">主体清晰，明暗得当；色调迷人，冷暖相映。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">10</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`2-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="10" value={scores[2][col]} onChange={(e) => handleScoreChange(2, col, e.target.value, 10)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium text-amber-900" rowSpan={2}>配文</td>
                        <td className="border border-amber-200 p-2 text-center font-medium">标题</td>
                        <td className="border border-amber-200 p-2">标题独特，凸显主题，引人遐想。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">10</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`3-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="10" value={scores[3][col]} onChange={(e) => handleScoreChange(3, col, e.target.value, 10)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium">内容</td>
                        <td className="border border-amber-200 p-2">语言准确，能抓住景物特点展开描写，生动形象，有特色。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">20</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`4-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="20" value={scores[4][col]} onChange={(e) => handleScoreChange(4, col, e.target.value, 20)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium text-amber-900" rowSpan={4}>诵读</td>
                        <td className="border border-amber-200 p-2 text-center font-medium">配乐</td>
                        <td className="border border-amber-200 p-2">配乐使用恰当，符合作品的意境。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">5</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`5-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="5" value={scores[5][col]} onChange={(e) => handleScoreChange(5, col, e.target.value, 5)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium">表达</td>
                        <td className="border border-amber-200 p-2">语言规范，普通话标准，吐字清晰，声音洪亮；表达技巧处理得当，语速恰当，语气、语调、音量、节奏符合情感的起伏变化。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">10</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`6-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="10" value={scores[6][col]} onChange={(e) => handleScoreChange(6, col, e.target.value, 10)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium">仪态</td>
                        <td className="border border-amber-200 p-2">精神饱满，着装端庄大方，能较好地运用肢体语言、表情进行辅助。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">5</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`7-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="5" value={scores[7][col]} onChange={(e) => handleScoreChange(7, col, e.target.value, 5)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-amber-50/50 transition-colors">
                        <td className="border border-amber-200 p-2 text-center font-medium">效果</td>
                        <td className="border border-amber-200 p-2">有吸引力和感染力，时间控制在5分钟之内。</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700 font-bold">10</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`8-${col}`} className="border border-amber-200 p-0 relative">
                            <input type="number" min="0" max="10" value={scores[8][col]} onChange={(e) => handleScoreChange(8, col, e.target.value, 10)} disabled={isTaskCompleted} className="w-full h-full p-2 text-center bg-transparent focus:bg-white focus:outline-none text-amber-900 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-colors" placeholder="-" />
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-amber-100/50 font-bold text-amber-900">
                        <td className="border border-amber-200 p-2 text-center" colSpan={3}>总分</td>
                        <td className="border border-amber-200 p-2 text-center text-amber-700">100</td>
                        {[0, 1, 2, 3, 4, 5].map((col) => (
                          <td key={`total-${col}`} className="border border-amber-200 p-2 text-center text-amber-800 text-lg">
                            {calculateTotal(col)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Global Submit Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <button 
            onClick={handleTaskSubmit}
            disabled={isTaskSubmitting || isTaskCompleted}
            className={`flex items-center justify-center gap-2 px-12 py-4 text-white rounded-xl transition-all shadow-lg font-bold text-lg w-full max-w-md ${
              isTaskCompleted 
                ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                : isTaskSubmitting
                  ? 'bg-indigo-500 cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            {isTaskSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <CheckCircle className="w-6 h-6" />
            )}
            {isTaskSubmitting ? '提交中...' : isTaskCompleted ? '完成啦' : '完成所有任务'}
          </button>
        </motion.div>
      </div>

      {/* Floating AI Button */}
      <button
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:animate-pulse" />
      </button>

      <AIAssistantModal 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onInsert={(text) => {
          setLearningNotes((prev) => prev + (prev ? "\n" : "") + text);
          setIsAIOpen(false);
        }}
      />
    </div>
  );
}