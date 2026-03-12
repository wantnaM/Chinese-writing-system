import { Annotation } from "../../app/components/theme-reading/ArticleBlock";

export type BlockType =
  | "description"
  | "reading_guide"
  | "task_driven"
  | "reading_recommendation"
  | "appreciation_list";

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface DescriptionBlockData extends BaseBlock {
  type: "description";
  iconName?: string; // lucide icon name
  themeColor?: "blue" | "indigo" | "green" | "purple";
  title: string;
  content: string;
  tipMode?: boolean; // If true, render as a smaller tip block
}

export interface ReadingGuideBlockData extends BaseBlock {
  type: "reading_guide";
  title: string;
  guideText: string;
  articleTitle: string;
  audioUrl?: string;
  paragraphs: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  description: string[];
  extraContent?: {
    title?: string;
    content: string[];
  };
  inputType: "text" | "textarea" | "image";
  placeholder?: string;
  wordLimit?: string;
}

export interface TaskDrivenBlockData extends BaseBlock {
  type: "task_driven";
  title: string;
  iconName?: string;
  themeColor?: "blue" | "indigo" | "green" | "purple";
  tasks: TaskItem[];
  submitText: string;
}

export interface ReadingRecommendationBlockData extends BaseBlock {
  type: "reading_recommendation";
  title: string;
  classics: string;
  essays: string;
}

export interface AppreciationItem {
  id: string;
  tag: string;
  intro: string;
  tips?: string;
  article: {
    title: string;
    author: string;
    allowAnnotation: boolean;
    paragraphs: {
      text: string;
      annotations: Annotation[];
    }[];
  };
}

export interface AppreciationListBlockData extends BaseBlock {
  type: "appreciation_list";
  items: AppreciationItem[];
}

export type ThemeBlock =
  | DescriptionBlockData
  | ReadingGuideBlockData
  | TaskDrivenBlockData
  | ReadingRecommendationBlockData
  | AppreciationListBlockData;

export interface ThemeTab {
  key: "reading" | "exchange" | "appreciation";
  label: string;
  icon: string;
  blocks: ThemeBlock[];
}

export interface ThemeReadingData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tabs: ThemeTab[];
}

export const mockThemeReadingData: ThemeReadingData = {
  id: "1",
  title: "第一单元 主题阅读：人间草木",
  description: "体会作者笔下的“草木情”，学习描画自然的方法",
  completed: false,
  tabs: [
    {
      key: "reading",
      label: "名著导读",
      icon: "📖",
      blocks: [
        {
          id: "reading-desc-1",
          type: "description",
          iconName: "BookOpen",
          themeColor: "blue",
          title: "学习指引",
          content: "品读名家关于自然的美文，领会其主旨与情感，学习\"语言风格借鉴法\"和\"添枝加叶法\"。",
        },
        {
          id: "reading-guide-1",
          type: "reading_guide",
          title: "名著导读",
          guideText: "草木枯荣，春秋更迭，自然万物，值得我们慢慢品味。正如汪曾祺所言：“如果你来访我，我不在，请和我门外的花坐一会儿，它们很温暖，我注视它们很多很多日子了。”翻阅《人间草木》，仿佛沐浴在阳光下，草木虫鸟鱼被赋予了人的气息，寻常食物在炊烟袅袅中散发着家的味道……",
          articleTitle: "《人间草木》节选 - 汪曾祺",
          audioUrl: "https://www.soundhelix.com/architecture/mp3-player/SoundHelix-Song-1.mp3",
          paragraphs: [
            "如果你来访我，我不在，请和我门外的花坐一会儿，它们很温暖，我注视它们很多很多日子了。它们开得不茂盛，想起来什么颜色就在秋天或春天开起一两朵。我是个不讲究种花的人。我只随便插活了一两棵。",
            "都说梨花像雪，其实苹果花才像雪。雪是厚重的，不是透明的。梨花像什么呢？——梨花的瓣子是月亮做的。那一年，花开得很迟。我是五月二日到的，这地方的杏花、桃花都已经谢了，只有几棵秋海棠开得正好。我每天到这几棵海棠树下来看一看。这花是看花海棠，不结海棠果。这种海棠我从来没有见过，花瓣是单瓣的，花开得很大，像小酒杯似的，粉红色的。我觉得这才是海棠。"
          ]
        },
        {
          id: "reading-task-1",
          type: "task_driven",
          title: "任务驱动",
          iconName: "Rocket",
          themeColor: "purple",
          submitText: "提交任务",
          tasks: [
            {
              id: "task-1",
              title: "任务一：读一读汪曾祺的\"草木情\"",
              description: [
                "古人云\"读万卷书不如行万里路\"，而读《人间草木》，就像是与一个可爱的老头走在田间地头，路过弄堂胡同，陪着他去拜访老友，和他一同品尝各地美食，听他娓娓叙说\"人间草木\"，回头发现，竟已踏遍万水千山……",
                "重点阅读《人间草木》中\"一果一蔬\"和\"季节的供养\"两辑，感受作者寄托在花、树、虫、鱼、鸟、兽、四季果园中的情思，并做批注。"
              ],
              extraContent: {
                title: "《人间草木》节选（一果一蔬/季节的供养）",
                content: [
                  "西瓜以绳络悬之井中，下午剖食，一刀下去，喀嚓有声，凉气四溢，连眼睛都是凉的。",
                  "秋海棠的叶子一面是绿的，一面是红的。这花开得很繁，花瓣有些像小莲花，不过是粉红的。",
                  "葡萄抽条，长叶，开花，结果，成熟，都是悄悄的。葡萄熟了，果园里充满了香气。葡萄的香气是很奇特的，有的像玫瑰，有的像香蕉。那是真正的果香。",
                  "枸杞子红了。秋天，树叶落了，只剩下这些红豆豆，很鲜艳。枸杞子可以泡水喝，也可以嚼着吃。有点甜。",
                  "花总是要开的。不管是不是有人看，不管你是不是心情好。"
                ]
              },
              inputType: "textarea",
              placeholder: "在此输入你对文章的批注和感悟..."
            },
            {
              id: "task-2",
              title: "任务二：品一品汪曾祺的文字",
              description: [
                "汪曾祺的文字给人一种舒服、有趣的感觉。\"舒服\"在于他的语言质朴、自然、温润、亲切；\"有趣\"在于他很擅长描写，其文字的画面感极强，还穿插有许多童年生活故事、民间谚俗、奇闻趣事等，十分丰富而生动。",
                "反复朗读你欣赏的语段，选择一段模仿练习，描绘一下身边的花草树木或虫鱼鸟兽。"
              ],
              inputType: "textarea",
              placeholder: "参考汪曾祺的风格，在这里描绘你身边的自然景物...",
              wordLimit: "100-300字"
            }
          ]
        },
        {
          id: "reading-desc-2",
          type: "description",
          iconName: "MessageCircleQuestion",
          themeColor: "indigo",
          title: "课后任务",
          content: "请在课后仔细阅读汪曾祺先生的散文集《人间草木》，感受作者平实质朴、形象生动、风趣幽默的语言风格，体会其笔下的\"草木情\"。"
        }
      ]
    },
    {
      key: "exchange",
      label: "读后交流",
      icon: "💬",
      blocks: [
        {
          id: "exchange-task-1",
          type: "task_driven",
          title: "读后交流",
          iconName: "MessageCircleQuestion",
          themeColor: "indigo",
          submitText: "提交任务",
          tasks: [
            {
              id: "exchange-1",
              title: "话题一：说说身边的自然万物",
              description: [
                "汪曾祺笔下的一草一木，都很天真、质朴，透出勃勃生机。《人间草木》流露着亲切的人间烟火气，读完这本书，跟自然握握手，去感受身边的自然万物，谈谈你的\"草木情\"吧。"
              ],
              inputType: "textarea",
              placeholder: "在此输入你的想法..."
            },
            {
              id: "exchange-2",
              title: "话题二：谈谈描画自然的方法",
              description: [
                "汪曾祺被誉为\"中国最后一个纯粹的文人，中国最后一个士大夫\"。不论是娓娓道来的凡人小事，还是自然流露的乡情，甚至是各有性情的花鸟虫鱼，他总能即兴偶感，于不经心、不刻意中用传神妙笔成就当代小品文的经典。人间草木，平中有奇，淡中有味。细细品读汪曾祺的文字，思考描画自然的方法，谈谈你的收获。"
              ],
              inputType: "textarea",
              placeholder: "在此输入你的想法..."
            }
          ]
        },
        {
          id: "exchange-rec-1",
          type: "reading_recommendation",
          title: "阅读推荐",
          classics: "孙犁《白洋淀纪事》",
          essays: "郁达夫《故都的秋》，林语堂《秋天的况味》，冯骥才《冬日絮语》，丰子恺《春》，迟子建《春天是一点一点化开的》"
        }
      ]
    },
    {
      key: "appreciation",
      label: "美文欣赏",
      icon: "✨",
      blocks: [
        {
          id: "appreciation-list-1",
          type: "appreciation_list",
          items: [
            {
              id: "article-1",
              tag: "美文赏析一",
              intro: "那城，那河，那古路，那山影，那座诗意般秋色纷呈的济南城，是否恰似你幻想中的秋景？作者把对秋天的钟爱，寄于济南那片叠彩幻化、层出不穷的山水间，通过对秋天景色的细腻描绘，述说济南古城静美的诗境。行文流畅，条理有序，像是喃喃低语间缓缓展开的画卷，让读者恍然入境，如身临其中。",
              article: {
                title: "济南的秋天",
                author: "老舍",
                allowAnnotation: false,
                paragraphs: [
                  {
                    text: "济南的秋天是诗境的。设若你的幻想中有个中古的老城，有睡着了的大城楼，有狭窄的古石路，有宽厚的石城墙，环城流着一道清溪，倒映着山影，岸上蹲着红袍绿裤的小妞儿。你的幻想中要是这么个境界，那便是个济南。设若你幻想不出——许多人是不会幻想的——请到济南来看看吧。",
                    annotations: [
                      {
                        id: "b1",
                        start: 0,
                        end: 11,
                        note: "一句话统领全文。",
                        type: "builtin"
                      }
                    ]
                  },
                  {
                    text: "请你在秋天来。那城，那河，那古路，那山影，是终年给你预备着的。可是，加上济南的秋色，济南由古朴的画境转入静美的诗境中了。这个诗意秋光秋色是济南独有的。上天把夏天的艺术赐给瑞士，把春天的赐给西湖，秋和冬的全赐给了济南。秋和冬是不好分开的，秋睡熟了一点便是冬，上天不愿意把它忽然唤醒，所以作个整人情，连秋带冬全给了济南。",
                    annotations: [
                      {
                        id: "b2",
                        start: 110,
                        end: 167,
                        note: "作者用西湖春天的景色、瑞士夏天的风光与济南的秋天做比较，衬托出济南秋天之美；又用拟人手法，写上天馈赠了济南秋冬两季，更衬出济南的得天独厚，表达了对济南的秋天的喜爱之情。",
                        type: "builtin"
                      }
                    ]
                  }
                ]
              }
            },
            {
              id: "article-2",
              tag: "美文赏析二",
              intro: "'日出江花红胜火，春来江水绿如蓝。''沾衣欲湿杏花雨，吹面不寒杨柳风。'杏花春雨的江南，是多少人心中念念不忘的诗境。而在作者笔下，那铺天盖地的蛙鸣声、无边无垠的金色花海以及那一捧盛开的映山红，都给我们展示了一个别样、鲜亮、蓬勃、壮美、满溢生机与活力的江南春景。",
              tips: "阅读下文，根据批注提示，完成批注，并根据\"语言风格借鉴法\"理清文章内容。",
              article: {
                title: "江南的春天",
                author: "陈荣力",
                allowAnnotation: true,
                paragraphs: [
                  {
                    text: "持续的阴雨，让江南的春天有点姗姗来迟。",
                    annotations: [
                      {
                        id: "a2-b1",
                        start: 0,
                        end: 0,
                        note: "批注提示：本文语言有何特点？作者描绘了江南春天的哪几幅画面？作者笔下的江南春天具有怎样的特点？",
                        type: "builtin"
                      }
                    ]
                  },
                  {
                    text: "其实，人们对每个春天的感受都是不一样的。记得第一次强烈感到春天扑面而来的，是四十余年前的那个三月。那时我正在浙东杭州湾畔的一个乡村供销站上班，来回途中要穿过一个村庄和一大片江南的田野。村庄有粉墙瓦舍、修竹桃杏，有短巷石径、小院篱笆；田野有河流蜿蜒、田塍阡陌，有青山远隐、岸柳斜逸。许是囿于上下班的匆忙，往日，对江南乡村的这般景致我多是熟视无睹。而那天早上当我一踏上穿越田野的土路时，一阵近乎沸腾的蛙鸣声如波涛一般向我卷来。咯咯咯，咕咕咕，咯咯咕，咯咕咯咕……正是仲春稻秧鹅黄半绿的时机，那暴雨骤落、万锅齐沸的蛙鸣，几乎来自每一寸水田、每一截沟渠、每一滩泥洼，甚至每一缕目光和呼吸。虽然脚步近处蛙声稍淡，但未及抬步，身前身后早被密密匝匝的蛙声层层裹挟，迭迭淹没。咯咯咯，咕咕咕，咯咕咯咕。清晨的阳光照在秧苗上，连着那铺天盖地的蛙鸣，整个田野都恍如一层嫩绿的薄毯绒绒起伏、软软沉浮。几只勤劳的白鹭时而驻足时而低翔，在嫩绿的浅处投下几点不规则的倒影。",
                    annotations: []
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};