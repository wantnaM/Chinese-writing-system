import React, { useState } from "react";
import { motion } from "motion/react";
import { AppreciationListBlockData } from "../../data/themeReadingMock";
import { ArticleBlock } from "./ArticleBlock";
import { DescriptionBlock } from "./DescriptionBlock";

export function AppreciationListBlock({ block }: { block: AppreciationListBlockData }) {
  const [activeTab, setActiveTab] = useState<string>(block.items[0]?.id);

  if (!block.items || block.items.length === 0) return null;

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 border-b-2 border-amber-200">
        {block.items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-6 py-3 rounded-t-xl font-bold font-sans text-lg whitespace-nowrap transition-all duration-300 ${
              activeTab === item.id
                ? "bg-amber-500 text-white shadow-md transform -translate-y-1"
                : "bg-amber-100/50 text-amber-800 hover:bg-amber-200/80 hover:-translate-y-0.5"
            }`}
          >
            {item.tag}
          </button>
        ))}
      </div>

      {block.items
        .filter((item) => item.id === activeTab)
        .map((item, index) => (
          <div key={item.id} className="mb-4">
            {/* 导读卡片 (Description Block) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DescriptionBlock
                block={{
                  id: `${item.id}-desc`,
                  type: "description",
                  title: `${item.tag} 导读`,
                  content: item.intro,
                  iconName: "MessageSquare",
                  themeColor: "purple"
                }}
              />
            </motion.div>

            {/* 小提示 (Description Block in tipMode) */}
            {item.tips && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <DescriptionBlock
                  block={{
                    id: `${item.id}-tip`,
                    type: "description",
                    title: "",
                    content: item.tips,
                    themeColor: "purple",
                    tipMode: true
                  }}
                />
              </motion.div>
            )}

            {/* 美文欣赏内容区 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ArticleBlock article={{ ...item.article, id: item.id, tag: item.tag }} />
            </motion.div>
          </div>
        ))}
    </div>
  );
}