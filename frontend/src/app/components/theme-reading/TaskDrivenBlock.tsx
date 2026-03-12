import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { TaskDrivenBlockData } from "../../data/themeReadingMock";
import { useAiInput } from "./AiInputContext";

export function TaskDrivenBlock({ block }: { block: TaskDrivenBlockData }) {
  const { setFocusedInputId, subscribeToInsert } = useAiInput();
  const Icon = block.iconName
    ? (LucideIcons[block.iconName as keyof typeof LucideIcons] as React.ElementType)
    : null;

  const colorClasses = {
    blue: {
      bg: "bg-white/80 border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-900",
      taskBg: "from-blue-50 to-cyan-50 border-blue-200",
      btnBg: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300",
      focusRing: "focus:ring-blue-100 focus:border-blue-400"
    },
    indigo: {
      bg: "bg-white/80 border-indigo-200",
      icon: "text-indigo-600",
      title: "text-indigo-900",
      taskBg: "from-indigo-50 to-blue-50 border-indigo-200",
      btnBg: "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300",
      focusRing: "focus:ring-indigo-100 focus:border-indigo-400"
    },
    green: {
      bg: "bg-white/80 border-green-200",
      icon: "text-green-600",
      title: "text-green-900",
      taskBg: "from-green-50 to-emerald-50 border-green-200",
      btnBg: "bg-green-600 hover:bg-green-700 disabled:bg-green-300",
      focusRing: "focus:ring-green-100 focus:border-green-400"
    },
    purple: {
      bg: "bg-white/80 border-purple-200",
      icon: "text-purple-600",
      title: "text-purple-900",
      taskBg: "from-purple-50 to-pink-50 border-purple-200",
      btnBg: "bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300",
      focusRing: "focus:ring-purple-100 focus:border-purple-400"
    },
  };

  const theme = colorClasses[block.themeColor || "purple"];

  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const allFilled = block.tasks.every(t => (taskInputs[t.id] || "").trim() !== "");

  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, this would call an API
  };

  useEffect(() => {
    const unsubscribers = block.tasks.map(task => 
      subscribeToInsert(task.id, (text) => {
        setTaskInputs(prev => ({
          ...prev,
          [task.id]: (prev[task.id] || "") + (prev[task.id] ? "\n" : "") + text
        }));
      })
    );
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [block.tasks, subscribeToInsert]);

  return (
    <section className={`backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 mb-8 ${theme.bg}`}>
      <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme.title}`}>
        {Icon && <Icon className={`w-6 h-6 ${theme.icon}`} />}
        {block.title}
      </h2>

      <div className="space-y-6">
        {block.tasks.map((task) => (
          <div key={task.id} className={`bg-gradient-to-br rounded-xl p-6 border-2 shadow-sm ${theme.taskBg}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={`text-lg font-bold ${theme.title}`}>
                {task.title}
              </h3>
              {isSubmitted && (
                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  <LucideIcons.CheckCircle className="w-3 h-3" />
                  已完成
                </span>
              )}
            </div>

            {task.description.map((desc, idx) => (
              <p key={idx} className="text-gray-700 text-sm leading-relaxed mb-3">
                {desc}
              </p>
            ))}

            {task.extraContent && (
              <div className="bg-orange-50/50 p-4 rounded-lg mb-4 text-sm text-gray-800 leading-relaxed border border-orange-100 overflow-y-auto">
                {task.extraContent.title && (
                  <h4 className="font-bold text-center text-lg mb-4 text-orange-900">
                    {task.extraContent.title}
                  </h4>
                )}
                {task.extraContent.content.map((p, idx) => (
                  <p key={idx} className="indent-8 mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-bold ${theme.title}`}>
                你的回答：
              </span>
            </div>

            {task.inputType === "textarea" ? (
              <textarea
                value={taskInputs[task.id] || ""}
                onChange={(e) => setTaskInputs({ ...taskInputs, [task.id]: e.target.value })}
                onFocus={() => setFocusedInputId(task.id)}
                placeholder={task.placeholder}
                className={`w-full h-32 md:h-40 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:outline-none resize-none text-sm bg-white ${theme.focusRing}`}
              />
            ) : (
              <input
                type="text"
                value={taskInputs[task.id] || ""}
                onChange={(e) => setTaskInputs({ ...taskInputs, [task.id]: e.target.value })}
                onFocus={() => setFocusedInputId(task.id)}
                placeholder={task.placeholder}
                className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:outline-none text-sm bg-white ${theme.focusRing}`}
              />
            )}

            {task.wordLimit && (
              <div className="flex justify-between items-center text-xs text-gray-500 px-1 mt-1">
                <span>当前字数：{(taskInputs[task.id] || "").length}</span>
                <span>建议字数：{task.wordLimit}</span>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={!allFilled || isSubmitted}
          className={`w-full py-3.5 mt-2 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${theme.btnBg}`}
        >
          {block.submitText}
        </button>
      </div>
    </section>
  );
}