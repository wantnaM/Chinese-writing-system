import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  MessageSquarePlus,
  X,
  Check,
  Sparkles,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { units } from "../data/units";

export type AnnotationType = "builtin" | "user";

export interface Annotation {
  id: string;
  start: number;
  end: number;
  note: string;
  type: AnnotationType;
}

interface Article {
  id: string;
  tag: string;
  title: string;
  author: string;
  intro: string;
  allowAnnotation?: boolean;
  paragraphs: {
    text: string;
    annotations: Annotation[];
  }[];
}

const p1Text =
  "济南的秋天是诗境的。设若你的幻想中有个中古的老城，有睡着了的大城楼，有狭窄的古石路，有宽厚的石城墙，环城流着一道清溪，倒映着山影，岸上蹲着红袍绿裤的小妞儿。你的幻想中要是这么个境界，那便是个济南。设若你幻想不出——许多人是不会幻想的——请到济南来看看吧。";
const p1Target = "济南的秋天是诗境的。";

const p2Text =
  "请你在秋天来。那城，那河，那古路，那山影，是终年给你预备着的。可是，加上济南的秋色，济南由古朴的画境转入静美的诗境中了。这个诗意秋光秋色是济南独有的。上天把夏天的艺术赐给瑞士，把春天的赐给西湖，秋和冬的全赐给了济南。秋和冬是不好分开的，秋睡熟了一点便是冬，上天不愿意把它忽然唤醒，所以作个整人情，连秋带冬全给了济南。";
const p2Target =
  "上天把夏天的艺术赐给瑞士，把春天的赐给西湖，秋和冬的全赐给了济南。秋和冬是不好分开的，秋睡熟了一点便是冬，上天不愿意把它忽然唤醒，所以作个整人情，连秋带冬全给了济南。";

const p3Text =
  "诗的境界中必须有山有水。那么，请看济南吧。那颜色不同，方向不同，高矮不同的山，在秋色中便越发的不同了。以颜色说吧，山腰中的松树是青黑的，加上秋阳的斜射，那片青黑便多出些比灰色深，比黑色浅的颜色，把旁边的黄草盖成一层灰中透黄的阴影，山脚是镶着各色条子的，一层层的，有的黄，有的灰，有的绿，有的似乎是藕荷色儿。山顶上的色儿也随着太阳的转移而不同。山顶的颜色不同还不重要，山腰中的颜色不同才真叫人想作几句诗。山腰中的颜色是永远在那儿变动，特别是在秋天，那阳光能够忽然清凉一会儿，忽然又温暖一会儿，这个变动并不激烈，可是山上的颜色觉得出这个变化，而立刻随着变换。忽然黄色更真了一些，忽然又暗了一些，忽然像有层看不见的薄雾在那儿流动，忽然像有股细风替“自然”调合着彩色，轻轻的抹上一层各色俱全而全是淡美的色道儿。有这样的山，再配上那蓝的天，晴暖的阳光；蓝得像要由蓝变绿了，可又没完全绿了；晴暖得要发燥了，可是有点凉风，正像诗一样的温柔；这便是济南的秋。况且因为颜色的不同，那山的高低也更显然了。高的更高了些，低的更低了些，山的棱角曲线在晴空中更真了，更分明了，更瘦硬了。看山顶上那个塔！";
const p3Target =
  "忽然黄色更真了一些，忽然又暗了一些，忽然像有层看不见的薄雾在那儿流动，忽然像有股细风替“自然”调合着彩色，轻轻的抹上一层各色俱全而全是淡美的色道儿。";

const p4Text =
  "再看水。以量说，以质说，以形式说，哪儿的水能比济南？有泉——到处是泉——有河，有湖，这是由形式上分。不管是泉是河是湖，全是那么清，全是那么甜，哎呀，济南是“自然”的Sweet heart（甜心）吧？大明湖夏日的莲花，城河的绿柳，自然是美好的了。可是看水，是要看秋水的。济南有秋山，又有秋水，这个秋才算个秋，因为秋神是在济南住家的。先不用说别的，只说水中的绿藻吧。那份儿绿色，恐怕没有别的东西能比拟的。这种鲜绿全借着水的清澄显露出来，好像美人借着镜子鉴赏自己的美。是的，这些绿藻是自己享受那水的甜美呢，不是为谁看的。它们知道它们那点绿的心事，它们终年在那儿吻着水皮，做着绿色的香梦。淘气的鸭子，用黄金的脚掌碰它们一两下。浣女的影儿，吻它们的绿叶一两下。只有这个，是它们的香甜的烦恼。羡慕死诗人呀！";
const p4Target1 =
  "不管是泉是河是湖，全是那么清，全是那么甜，哎呀，济南是“自然”的Sweet heart（甜心）吧？大明湖夏日的莲花，城河的绿柳，自然是美好的了。可是看水，是要看秋水的。济南有秋山，又有秋水，这个秋才算个秋，因为秋神是在济南住家的。";
const p4Target2 =
  "这种鲜绿全借着水的清澄显露出来，好像美人借着镜子鉴赏自己的美。";
const p4Target3 =
  "淘气的鸭子，用黄金的脚掌碰它们一两下。浣女的影儿，吻它们的绿叶一两下。";

const p5Text =
  "在秋天，水和蓝天一样的清凉。天上微微有些白云，水上微微有些波皱。天水之间，全是清明，温暖的空气，带着一点桂花的香味。山影儿也更真了。秋山秋水虚幻的吻着。山儿不动，水儿微响。那中古的老城，带着这片秋色秋声，是济南，是诗。";

const a2p1Text = "持续的阴雨，让江南的春天有点姗姗来迟。";

const a2p2Text =
  "其实，人们对每个春天的感受都是不一样的。记得第一次强烈感到春天扑面而来的，是四十余年前的那个三月。那时我正在浙东杭州湾畔的一个乡村供销站上班，来回途中要穿过一个村庄和一大片江南的田野。村庄有粉墙瓦舍、修竹桃杏，有短巷石径、小院篱笆；田野有河流蜿蜒、田塍阡陌，有青山远隐、岸柳斜逸。许是囿于上下班的匆忙，往日，对江南乡村的这般景致我多是熟视无睹。而那天早上当我一踏上穿越田野的土路时，一阵近乎沸腾的蛙鸣声如波涛一般向我卷来。咯咯咯，咕咕咕，咯咯咕，咯咕咯咕……正是仲春稻秧鹅黄半绿的时机，那暴雨骤落、万锅齐沸的蛙鸣，几乎来自每一寸水田、每一截沟渠、每一滩泥洼，甚至每一缕目光和呼吸。虽然脚步近处蛙声稍淡，但未及抬步，身前身后早被密密匝匝的蛙声层层裹挟，迭迭淹没。咯咯咯，咕咕咕，咯咕咯咕。清晨的阳光照在秧苗上，连着那铺天盖地的蛙鸣，整个田野都恍如一层嫩绿的薄毯绒绒起伏、软软沉浮。几只勤劳的白鹭时而驻足时而低翔，在嫩绿的浅处投下几点不规则的倒影。";

const a2p3Text =
  "阳光、蛙鸣、白鹭、绿毯……春天第一次在我十八岁的生命里烙下华美的印记，定格成湿漉漉的底片。而那铺天盖地的蛙鸣声，如春天的歌唱和宣言，是如此鲜亮，如此蓬勃，如此溢满生机和活力。声音——春天的声音，也成为我真切认知春天的第一个关键词。";

const articles: Article[] = [
  {
    id: "article-1",
    tag: "美文赏析一",
    title: "济南的秋天",
    author: "老舍",
    intro:
      "那城，那河，那古路，那山影，那座诗意般秋色纷呈的济南城，是否恰似你幻想中的秋景？作者把对秋天的钟爱，寄于济南那片叠彩幻化、层出不穷的山水间，通过对秋天景色的细腻描绘，述说济南古城静美的诗境。行文流畅，条理有序，像是喃喃低语间缓缓展开的画卷，让读者恍然入境，如身临其中。",
    paragraphs: [
      {
        text: p1Text,
        annotations: [
          {
            id: "b1",
            start: p1Text.indexOf(p1Target),
            end: p1Text.indexOf(p1Target) + p1Target.length,
            note: "一句话统领全文。",
            type: "builtin",
          },
        ],
      },
      {
        text: p2Text,
        annotations: [
          {
            id: "b2",
            start: p2Text.indexOf(p2Target),
            end: p2Text.indexOf(p2Target) + p2Target.length,
            note: "作者用西湖春天的景色、瑞士夏天的风光与济南的秋天做比较，衬托出济南秋天之美；又用拟人手法，写上天馈赠了济南秋冬两季，更衬出济南的得天独厚，表达了对济南的秋天的喜爱之情。",
            type: "builtin",
          },
        ],
      },
      {
        text: p3Text,
        annotations: [
          {
            id: "b3",
            start: p3Text.indexOf(p3Target),
            end: p3Text.indexOf(p3Target) + p3Target.length,
            note: "连用六个“忽然”，写出了秋天山腰中色彩的丰富且多变。",
            type: "builtin",
          },
        ],
      },
      {
        text: p4Text,
        annotations: [
          {
            id: "b4-1",
            start: p4Text.indexOf(p4Target1),
            end: p4Text.indexOf(p4Target1) + p4Target1.length,
            note: "自然且口语化的语言，仿佛在和读者对话，读来通俗易懂，令人倍感亲切。",
            type: "builtin",
          },
          {
            id: "b4-2",
            start: p4Text.indexOf(p4Target2),
            end: p4Text.indexOf(p4Target2) + p4Target2.length,
            note: "将鲜绿色的水藻比作美人，将鸭子拟人化，一切都充满灵气与活力，在它们的点缀下，济南的秋水更显生动、美妙，令人神往。",
            type: "builtin",
          },
          {
            id: "b4-3",
            start: p4Text.indexOf(p4Target3),
            end: p4Text.indexOf(p4Target3) + p4Target3.length,
            note: "将鲜绿色的水藻比作美人，将鸭子拟人化，一切都充满灵气与活力，在它们的点缀下，济南的秋水更显生动、美妙，令人神往。",
            type: "builtin",
          },
        ],
      },
      {
        text: p5Text,
        annotations: [],
      },
    ],
  },
  {
    id: "article-2",
    tag: "美文赏析二",
    title: "江南的春天",
    author: "陈荣力",
    allowAnnotation: true,
    intro:
      "“日出江花红胜火，春来江水绿如蓝。”“沾衣欲湿杏花雨，吹面不寒杨柳风。”杏花春雨的江南，是多少人心中念念不忘的诗境。而在作者笔下，那铺天盖地的蛙鸣声、无边无垠的金色花海以及那一捧盛开的映山红，都给我们展示了一个别样、鲜亮、蓬勃、壮美、满溢生机与活力的江南春景。",
    paragraphs: [
      {
        text: a2p1Text,
        annotations: [
          {
            id: "a2-b1",
            start: 0,
            end: 0,
            note: "批注提示：本文语言有何特点？作者描绘了江南春天的哪几幅画面？作者笔下的江南春天具有怎样的特点？",
            type: "builtin",
          },
        ],
      },
      {
        text: a2p2Text,
        annotations: [],
      },
      {
        text: a2p3Text,
        annotations: [],
      },
    ],
  },
];

export default function LessonAppreciation() {
  const navigate = useNavigate();
  const { unitId, lessonId } = useParams();

  const unit = units.find((u) => u.id === Number(unitId));
  const lesson = unit?.lessons.find(
    (l) => l.id === Number(lessonId),
  );

  const [userAnnotations, setUserAnnotations] = useState<
    Record<string, Record<number, Annotation[]>>
  >({});
  const [activeNoteId, setActiveNoteId] = useState<
    string | null
  >(null);

  const [selectionPopup, setSelectionPopup] = useState<{
    articleId: string;
    paraIndex: number;
    start: number;
    end: number;
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const [editingNote, setEditingNote] = useState<{
    articleId: string;
    paraIndex: number;
    start: number;
    end: number;
    text: string;
  } | null>(null);
  const [draftNote, setDraftNote] = useState("");

  useEffect(() => {
    const handleScroll = () => setSelectionPopup(null);
    window.addEventListener("scroll", handleScroll, true);
    return () =>
      window.removeEventListener("scroll", handleScroll, true);
  }, []);

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

  const handleMouseUp = (
    e: React.MouseEvent | React.TouchEvent,
    articleId: string,
    paraIndex: number,
  ) => {
    const article = articles.find((a) => a.id === articleId);
    if (!article?.allowAnnotation) return;

    const currentTarget = e.currentTarget as HTMLElement;

    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const range = selection.getRangeAt(0);
      if (
        !currentTarget ||
        !currentTarget.contains(range.commonAncestorContainer)
      )
        return;

      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(currentTarget);
      preSelectionRange.setEnd(
        range.startContainer,
        range.startOffset,
      );
      const start = preSelectionRange.toString().length;
      const text = range.toString();
      const end = start + text.length;

      if (text.trim().length > 0) {
        const rect = range.getBoundingClientRect();
        setSelectionPopup({
          articleId,
          paraIndex,
          start,
          end,
          text: text.trim(),
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
      }
    }, 50);
  };

  const getNotesForParagraph = (
    articleId: string,
    index: number,
  ) => {
    const article = articles.find((a) => a.id === articleId);
    if (!article) return [];
    const builtin = article.paragraphs[index].annotations || [];
    const user = userAnnotations[articleId]?.[index] || [];
    return [...builtin, ...user].sort(
      (a, b) => a.start - b.start,
    );
  };

  const saveNote = () => {
    if (!editingNote || !draftNote.trim()) return;

    const newNote: Annotation = {
      id: `u-${Date.now()}`,
      start: editingNote.start,
      end: editingNote.end,
      note: draftNote,
      type: "user",
    };

    setUserAnnotations((prev) => {
      const articleNotes = prev[editingNote.articleId] || {};
      const paraNotes =
        articleNotes[editingNote.paraIndex] || [];
      return {
        ...prev,
        [editingNote.articleId]: {
          ...articleNotes,
          [editingNote.paraIndex]: [...paraNotes, newNote],
        },
      };
    });

    setEditingNote(null);
    setDraftNote("");
    setActiveNoteId(newNote.id);
    window.getSelection()?.removeAllRanges();
  };

  const renderParagraphSegments = (
    text: string,
    notes: Annotation[],
  ) => {
    const validNotes = [];
    let lastEnd = 0;
    for (const n of notes) {
      if (n.start >= lastEnd && n.start < n.end) {
        validNotes.push(n);
        lastEnd = n.end;
      }
    }

    const segments: React.ReactNode[] = [];
    let currentIdx = 0;

    validNotes.forEach((note) => {
      if (note.start > currentIdx) {
        segments.push(
          <span key={`text-${currentIdx}`}>
            {text.substring(currentIdx, note.start)}
          </span>,
        );
      }

      const isUser = note.type === "user";
      const isActive = activeNoteId === note.id;

      segments.push(
        <span
          key={`note-${note.id}`}
          onClick={() =>
            setActiveNoteId(isActive ? null : note.id)
          }
          className={`
            cursor-pointer transition-colors duration-200
            ${
              isUser
                ? "border-b-2 border-amber-500 hover:bg-amber-100/50"
                : "border-b border-gray-600 hover:bg-gray-200/50"
            }
            ${isActive && isUser ? "bg-amber-100/80 text-amber-900" : ""}
            ${isActive && !isUser ? "bg-amber-100 text-black font-medium" : ""}
          `}
        >
          {text.substring(note.start, note.end)}
        </span>,
      );
      currentIdx = note.end;
    });

    if (currentIdx < text.length) {
      segments.push(
        <span key={`text-${currentIdx}`}>
          {text.substring(currentIdx)}
        </span>,
      );
    }

    return segments;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 font-serif"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest("#selection-popup") &&
          !target.closest(".modal-content")
        ) {
          setSelectionPopup(null);
        }
      }}
      onTouchStart={(e) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest("#selection-popup") &&
          !target.closest(".modal-content")
        ) {
          setSelectionPopup(null);
        }
      }}
    >
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* 原有页面的 Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate(`/unit/${unitId}`)}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-900 mb-6 transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回课时列表
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-purple-200 mb-8 font-sans">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">
                    {lesson.title}
                  </h1>
                </div>
                <p className="text-purple-700">
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
        </motion.div>

        {articles.map((article, aIndex) => (
          <div key={article.id} className="mb-4">
            {/* 导读卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + aIndex * 0.2 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6 border border-purple-200 font-sans"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-purple-900 mb-2">
                    {article.tag} 导读
                  </h3>
                  <p className="text-base text-purple-800 leading-relaxed text-justify mb-4">
                    {article.intro}
                  </p>
                  {article.id === "article-2" && (
                    <div className="bg-white/60 p-3 rounded-lg border-l-4 border-purple-400">
                      <p className="text-sm text-purple-800 mt-1">
                        阅读下文，根据批注提示，完成批注，并根据“语言风格借鉴法”理清文章内容。选中文章的文字，添加批注。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 美文欣赏内容区 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + aIndex * 0.2 }}
              className="bg-[#FFFDF5] rounded-2xl shadow-xl p-8 sm:p-12 mb-12 relative border-2 border-amber-200"
            >
              <div className="absolute top-0 left-0 bg-amber-500 text-white px-6 py-2 rounded-br-2xl rounded-tl-xl font-sans font-bold text-lg shadow-md z-20">
                {article.tag}
              </div>

              <div className="text-center mb-10 pt-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-widest">
                  {article.title}
                </h1>
                <p className="text-lg text-gray-600 tracking-widest">
                  {article.author}
                </p>
              </div>

              <div className="flex flex-col">
                {/* Paragraphs */}
                {article.paragraphs.map((p, i) => {
                  const notes = getNotesForParagraph(
                    article.id,
                    i,
                  );
                  return (
                    <div
                      className="flex relative flex-col md:flex-row"
                      key={i}
                    >
                      <div className="flex-1 md:pr-8 md:border-r-2 border-dashed border-amber-200 pb-8">
                        <p
                          className="indent-8 text-gray-800 leading-[2.5] text-xl text-justify selection:bg-amber-200/50"
                          onMouseUp={(e) =>
                            handleMouseUp(e, article.id, i)
                          }
                          onTouchEnd={(e) =>
                            handleMouseUp(e, article.id, i)
                          }
                        >
                          {renderParagraphSegments(
                            p.text,
                            notes,
                          )}
                        </p>
                      </div>
                      <div className="w-full md:w-[180px] shrink-0 md:pl-6 pb-8 flex flex-col justify-start space-y-4 pt-2">
                        {notes.map((note) => {
                          const isUser = note.type === "user";
                          const isActive =
                            activeNoteId === note.id;
                          return (
                            <div
                              key={note.id}
                              onClick={() =>
                                setActiveNoteId(
                                  isActive ? null : note.id,
                                )
                              }
                              className={`
                                p-3 cursor-pointer transition-all duration-300 text-left relative group
                                ${
                                  isUser
                                    ? `rounded-lg border ${isActive ? "bg-amber-50 border-amber-300 shadow-sm" : "bg-white border-amber-100 hover:bg-amber-50/50"}`
                                    : `border-l-2 ${isActive ? "border-amber-500 bg-amber-100/50 font-medium text-gray-900" : "border-transparent text-gray-600 hover:text-gray-800"}`
                                }
                              `}
                            >
                              <p
                                className={`text-[13px] leading-relaxed ${isUser ? "text-amber-900 font-sans" : "font-serif"}`}
                              >
                                {note.note}
                              </p>
                              {isUser && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUserAnnotations(
                                      (prev) => {
                                        const articleNotes =
                                          prev[article.id] ||
                                          {};
                                        const paraNotes =
                                          articleNotes[i] || [];
                                        return {
                                          ...prev,
                                          [article.id]: {
                                            ...articleNotes,
                                            [i]: paraNotes.filter(
                                              (n) =>
                                                n.id !==
                                                note.id,
                                            ),
                                          },
                                        };
                                      },
                                    );
                                  }}
                                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors bg-white/80 rounded-full p-0.5 shadow-sm"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Selection Popup */}
      <AnimatePresence>
        {selectionPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            id="selection-popup"
            className="fixed z-40 transform -translate-x-1/2 -translate-y-full pb-3"
            style={{
              left: selectionPopup.x,
              top: selectionPopup.y,
            }}
          >
            <div className="bg-gray-800 text-white p-1.5 rounded-lg shadow-xl flex items-center">
              <button
                className="flex items-center gap-1.5 hover:bg-gray-700 px-3 py-1.5 rounded text-sm transition-colors font-sans whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingNote(selectionPopup);
                  setSelectionPopup(null);
                }}
              >
                <MessageSquarePlus className="w-4 h-4" />
                添加批注
              </button>
            </div>
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Note Modal */}
      <AnimatePresence>
        {editingNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F9F9F9] rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-200 modal-content font-sans"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5" />
                添加批注
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-serif italic border-l-4 border-gray-300 pl-3 py-1 bg-gray-200/50 rounded-r line-clamp-3">
                  "{editingNote.text}"
                </p>
              </div>
              <textarea
                autoFocus
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white resize-none outline-none text-gray-800 text-sm"
                placeholder="写下你的批注、感悟或疑问..."
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-5">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                  onClick={() => {
                    setEditingNote(null);
                    setDraftNote("");
                    window.getSelection()?.removeAllRanges();
                  }}
                >
                  取消
                </button>
                <button
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center gap-1 text-sm font-medium"
                  onClick={saveNote}
                >
                  <Check className="w-4 h-4" />
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}