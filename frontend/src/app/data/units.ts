// 单元数据 - 重构后以主题为核心

export interface Theme {
  id: number;
  title: string;
  type: 'themeReading' | 'themeActivity' | 'techniqueLearning';
  description: string;
  completed?: boolean;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  image: string;
  completed?: boolean;
  themes: Theme[];
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  earned: boolean;
  unitId?: number;
}

export const units: Unit[] = [
  {
    id: 1,
    title: "亲近自然",
    description: "走进大自然，感受四季之美",
    image: "https://images.unsplash.com/photo-1598439473183-42c9301db5dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcyOTkxMDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    themes: [
      {
        id: 1,
        title: "主题阅读",
        type: 'themeReading',
        description: "品读名家自然美文，交流分享阅读感悟，赏析经典文学作品",
        completed: true,
      },
      {
        id: 2,
        title: "主题活动",
        type: 'themeActivity',
        description: "拍美景、写美文、展秋色，用镜头和文字记录自然之美",
        completed: true,
      },
      {
        id: 3,
        title: "技法学习",
        type: 'techniqueLearning',
        description: "学习写作技法，提升语言表达能力",
        completed: false,
      },
    ]
  },
];

export const badges: Badge[] = [
  { id: 1, name: "自然观察家", icon: "🌿", earned: false, unitId: 1 },
  { id: 2, name: "文学爱好者", icon: "📚", earned: false, unitId: 1 },
  { id: 6, name: "勤奋学习者", icon: "✨", earned: false },
  { id: 7, name: "完美主义者", icon: "🏆", earned: false },
  { id: 8, name: "坚持不懈", icon: "💪", earned: false },
];

export const dailyPoems = [
  {
    content: "春眠不觉晓，处处闻啼鸟。",
    author: "孟浩然《春晓》"
  },
  {
    content: "明月松间照，清泉石上流。",
    author: "王维《山居秋暝》"
  },
  {
    content: "采菊东篱下，悠然见南山。",
    author: "陶渊明《饮酒》"
  },
  {
    content: "碧玉妆成一树高，万条垂下绿丝绦。",
    author: "贺知章《咏柳》"
  },
  {
    content: "天街小雨润如酥，草色遥看近却无。",
    author: "韩愈《早春呈水部张十八员外》"
  }
];
