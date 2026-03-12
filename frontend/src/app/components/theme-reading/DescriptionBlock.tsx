import React from "react";
import * as LucideIcons from "lucide-react";
import { DescriptionBlockData } from "../../data/themeReadingMock";

export function DescriptionBlock({ block }: { block: DescriptionBlockData }) {
  const Icon = block.iconName
    ? (LucideIcons[block.iconName as keyof typeof LucideIcons] as React.ElementType)
    : null;

  const colorClasses = {
    blue: {
      bg: "bg-white/80 border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-900",
    },
    indigo: {
      bg: "bg-white/80 border-indigo-200",
      icon: "text-indigo-600",
      title: "text-indigo-900",
    },
    green: {
      bg: "bg-white/80 border-green-200",
      icon: "text-green-600",
      title: "text-green-900",
    },
    purple: {
      bg: "bg-white/80 border-purple-200",
      icon: "text-purple-600",
      title: "text-purple-900",
    },
  };

  const theme = colorClasses[block.themeColor || "blue"];

  if (block.tipMode) {
    return (
      <div className={`p-4 rounded-xl border-l-4 mb-6 shadow-sm ${block.themeColor === 'purple' ? 'bg-purple-50/80 border-purple-400 text-purple-800' : 'bg-gray-50 border-gray-400 text-gray-800'}`}>
        <p className="text-sm font-medium">
          {block.content}
        </p>
      </div>
    );
  }

  return (
    <section className={`backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 mb-8 ${theme.bg}`}>
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className={`w-6 h-6 ${theme.icon}`} />}
        <h2 className={`text-xl font-bold ${theme.title}`}>
          {block.title}
        </h2>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        {block.content}
      </p>
    </section>
  );
}