// 模拟数据

export interface Unit {
  id: number;
  title: string;
  description: string;
  totalTasks: number;
  completedTasks: number;
  isCompleted: boolean;
  coverImage: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  color: string;
  earned: boolean;
  unitId: number;
}

export interface Poem {
  content: string;
  author: string;
  dynasty?: string;
}

// 每日诗词数据
export const dailyPoems: Poem[] = [
  {
    content: "春眠不觉晓，处处闻啼鸟",
    author: "孟浩然",
    dynasty: "唐"
  },
  {
    content: "明月松间照，清泉石上流",
    author: "王维",
    dynasty: "唐"
  },
  {
    content: "落霞与孤鹜齐飞，秋水共长天一色",
    author: "王勃",
    dynasty: "唐"
  },
  {
    content: "天街小雨润如酥，草色遥看近却无",
    author: "韩愈",
    dynasty: "唐"
  }
];

// 单元数据
export const units: Unit[] = [
  {
    id: 1,
    title: "亲近自然",
    description: "观察自然之美，感受四季更迭",
    totalTasks: 8,
    completedTasks: 8,
    isCompleted: true,
    coverImage: "https://images.unsplash.com/photo-1648311020731-f78a05783fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYm9vayUyMG5hdHVyZSUyMHJlYWRpbmd8ZW58MXx8fHwxNzczMTA2ODI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "童年记忆",
    description: "回忆往事，记录成长点滴",
    totalTasks: 6,
    completedTasks: 4,
    isCompleted: false,
    coverImage: "https://images.unsplash.com/photo-1543281667-852922135312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwY2FsbGlncmFwaHklMjBwb2V0cnklMjBib29rfGVufDF8fHx8MTc3MzEwNjgyNXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "人物写真",
    description: "描绘人物特征，刻画性格神韵",
    totalTasks: 7,
    completedTasks: 0,
    isCompleted: false,
    coverImage: "https://images.unsplash.com/photo-1684871430772-569936b1a0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwbGFuZHNjYXBlJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzczMTA2ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "想象天地",
    description: "放飞想象翅膀，创作奇妙故事",
    totalTasks: 5,
    completedTasks: 0,
    isCompleted: false,
    coverImage: "https://images.unsplash.com/photo-1622102686103-dd4ea18f1d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbWVkYWwlMjBhY2hpZXZlbWVudCUyMGJhZGdlfGVufDF8fHx8MTc3MzEwNjgyNnww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

// 徽章数据
export const badges: Badge[] = [
  {
    id: 1,
    name: "自然观察家",
    icon: "🌿",
    color: "#10b981",
    earned: true,
    unitId: 1
  },
  {
    id: 2,
    name: "诗词新星",
    icon: "⭐",
    color: "#fbbf24",
    earned: true,
    unitId: 1
  },
  {
    id: 3,
    name: "回忆作家",
    icon: "📖",
    color: "#3b82f6",
    earned: false,
    unitId: 2
  },
  {
    id: 4,
    name: "人物大师",
    icon: "🎨",
    color: "#8b5cf6",
    earned: false,
    unitId: 3
  },
  {
    id: 5,
    name: "想象力冠军",
    icon: "🚀",
    color: "#ec4899",
    earned: false,
    unitId: 4
  }
];

// 获取今日诗词（基于日期）
export function getTodayPoem(): Poem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return dailyPoems[dayOfYear % dailyPoems.length];
}
