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

// 单元数据 - 只保留第一单元
export const units: Unit[] = [
  {
    id: 1,
    title: "亲近自然",
    description: "观察自然之美，感受四季更迭",
    totalTasks: 3,
    completedTasks: 2,
    isCompleted: false,
    coverImage: "https://images.unsplash.com/photo-1648311020731-f78a05783fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYm9vayUyMG5hdHVyZSUyMHJlYWRpbmd8ZW58MXx8fHwxNzczMTA2ODI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
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
];

// 获取今日诗词（基于日期）
export function getTodayPoem(): Poem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return dailyPoems[dayOfYear % dailyPoems.length];
}
