// 单元数据
export interface Unit {
  id: number;
  title: string;
  description: string;
  image: string;
  completed?: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  type: 'reading' | 'appreciation' | 'activity' | 'writing' | 'exchange';
  description: string;
  completed?: boolean;
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
    lessons: [
      { id: 1, title: "第一课：主题阅读", type: 'reading', description: "品读名家关于自然的美文", completed: true },
      { id: 2, title: "第二课：美文欣赏", type: 'appreciation', description: "美文赏析与批注", completed: true },
      { id: 3, title: "第三课：拍美景，诵美文", type: 'activity', description: "用镜头记录自然之美", completed: true },
      { id: 4, title: "第四课：阅读交流", type: 'exchange', description: "阅读后的交流与分享" },
      { id: 5, title: "第五课：片段练习", type: 'writing', description: "练习描写一处景物" },
      { id: 6, title: "第六课：素材积累", type: 'reading', description: "收集优美词句" },
      { id: 7, title: "第七课：实战操练", type: 'writing', description: "完整写作：我眼中的四季" },
    ]
  },
  {
    id: 2,
    title: "感悟生活",
    description: "用心体会生活中的点滴感动",
    image: "https://images.unsplash.com/photo-1648992137572-02d9646bbbda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmbG93ZXJzJTIwZ2FyZGVufGVufDF8fHx8MTc3MzEwNTczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    lessons: [
      { id: 1, title: "第一课：主题阅读", type: 'reading', description: "阅读关于生活感悟的文章", completed: true },
      { id: 2, title: "第二课：美文欣赏", type: 'appreciation', description: "品味生活的细节描写" },
      { id: 3, title: "第三课：生活观察", type: 'activity', description: "记录生活中的小确幸" },
      { id: 4, title: "第四课：实战操练", type: 'writing', description: "写一篇生活随笔" },
    ]
  },
  {
    id: 3,
    title: "传统文化",
    description: "传承中华优秀传统文化",
    image: "https://images.unsplash.com/photo-1760030427701-7125ab580daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2hpbmVzZSUyMGJvb2tzfGVufDF8fHx8MTc3MzEwNTczOHww&ixlib=rb-4.1.0&q=80&w=1080",
    lessons: [
      { id: 1, title: "第一课：古诗词鉴赏", type: 'reading', description: "学习经典古诗词" },
      { id: 2, title: "第二课：文言文阅读", type: 'appreciation', description: "理解文言文之美" },
      { id: 3, title: "第三课：实战操练", type: 'writing', description: "仿写古诗词" },
    ]
  },
  {
    id: 4,
    title: "想象创作",
    description: "展开想象的翅膀，创作精彩故事",
    image: "https://images.unsplash.com/photo-1671834215145-f876dfd2399e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBsZWF2ZXMlMjBmb3Jlc3R8ZW58MXx8fHwxNzczMDc1NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    lessons: [
      { id: 1, title: "第一课：想象力训练", type: 'reading', description: "学习想象的方法" },
      { id: 2, title: "第二课：故事创作", type: 'writing', description: "编写一个小故事" },
    ]
  },
];

export const badges: Badge[] = [
  { id: 1, name: "自然观察家", icon: "🌿", earned: false, unitId: 1 },
  { id: 2, name: "文学爱好者", icon: "📚", earned: false, unitId: 1 },
  { id: 3, name: "生活智者", icon: "🌟", earned: false, unitId: 2 },
  { id: 4, name: "传统文化守护者", icon: "🏮", earned: false, unitId: 3 },
  { id: 5, name: "创意大师", icon: "🎨", earned: false, unitId: 4 },
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