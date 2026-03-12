import React, { useState } from "react";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { AIAssistantModal } from "../components/AIAssistantModal";
import { mockThemeReadingData, ThemeBlock } from "../data/themeReadingMock";
import { DescriptionBlock } from "../components/theme-reading/DescriptionBlock";
import { ReadingGuideBlock } from "../components/theme-reading/ReadingGuideBlock";
import { TaskDrivenBlock } from "../components/theme-reading/TaskDrivenBlock";
import { ReadingRecommendationBlock } from "../components/theme-reading/ReadingRecommendationBlock";
import { AppreciationListBlock } from "../components/theme-reading/AppreciationListBlock";
import { AiInputProvider, useAiInput } from "../components/theme-reading/AiInputContext";

function BlockRenderer({ block }: { block: ThemeBlock }) {
  switch (block.type) {
    case "description":
      return <DescriptionBlock block={block} />;
    case "reading_guide":
      return <ReadingGuideBlock block={block} />;
    case "task_driven":
      return <TaskDrivenBlock block={block} />;
    case "reading_recommendation":
      return <ReadingRecommendationBlock block={block} />;
    case "appreciation_list":
      return <AppreciationListBlock block={block} />;
    default:
      return null;
  }
}

export default function ThemeReading() {
  return (
    <AiInputProvider>
      <ThemeReadingContent />
    </AiInputProvider>
  );
}

function ThemeReadingContent() {
  const { unitId } = useParams();
  const navigate = useNavigate();

  // AI 助手状态
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { focusedInputId, insertText } = useAiInput();

  // 默认使用 mock 数据
  const data = mockThemeReadingData;
  const [activeSection, setActiveSection] = useState<string>(data.tabs[0].key);

  const activeTab = data.tabs.find((t) => t.key === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pb-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/unit/${unitId || 1}`)}
          className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回主题列表
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-amber-200 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
                {data.title}
              </h1>
              <p className="text-amber-700">
                {data.description}
              </p>
            </div>
            {data.completed && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  已完成
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {data.tabs.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                activeSection === section.key
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                  : "bg-white/80 text-amber-700 border-2 border-amber-200 hover:bg-amber-50"
              }`}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Based on Selected Tab */}
        <div className="space-y-8">
          {activeTab?.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>

      {/* Floating AI Button */}
      <button
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:animate-pulse" />
      </button>

      {/* AI Assistant Chat Modal Instance */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onInsert={(text) => {
          if (focusedInputId) {
            insertText(focusedInputId, text);
          }
          setIsAIOpen(false);
        }}
      />
    </div>
  );
}