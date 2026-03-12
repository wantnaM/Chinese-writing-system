import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { ReadingRecommendationBlockData } from "../../data/themeReadingMock";
import { useAiInput } from "./AiInputContext";

export function ReadingRecommendationBlock({ block }: { block: ReadingRecommendationBlockData }) {
  const { setFocusedInputId, subscribeToInsert } = useAiInput();
  const [recommendations, setRecommendations] = useState([
    { title: "", author: "", reason: "" },
    { title: "", author: "", reason: "" },
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const allFilled = recommendations.every(
    (r) => r.title.trim() && r.author.trim() && r.reason.trim()
  );

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    const unsubscribers: Array<() => void> = [];
    recommendations.forEach((_, index) => {
      unsubscribers.push(subscribeToInsert(`rec-title-${index}`, (text) => {
        setRecommendations(prev => {
          const newRecs = [...prev];
          newRecs[index].title = prev[index].title + text;
          return newRecs;
        });
      }));
      unsubscribers.push(subscribeToInsert(`rec-author-${index}`, (text) => {
        setRecommendations(prev => {
          const newRecs = [...prev];
          newRecs[index].author = prev[index].author + text;
          return newRecs;
        });
      }));
      unsubscribers.push(subscribeToInsert(`rec-reason-${index}`, (text) => {
        setRecommendations(prev => {
          const newRecs = [...prev];
          newRecs[index].reason = prev[index].reason + text;
          return newRecs;
        });
      }));
    });
    return () => unsubscribers.forEach(unsub => unsub());
  }, [subscribeToInsert, recommendations.length]);

  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-indigo-200 relative mb-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-indigo-900">
          {block.title}
        </h2>
      </div>

      <div className="space-y-6 text-gray-800 text-sm leading-relaxed md:px-2">
        <p>
          <span className="font-bold">【 名著推荐 】</span>
          {block.classics}
        </p>
        <p>
          <span className="font-bold">【 美文推荐 】</span>
          {block.essays}
        </p>
        
        <div>
          <p className="font-bold mb-3">【 我来推荐 】</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600 bg-white">
              <thead>
                <tr className="bg-gray-200 text-center text-gray-800">
                  <th className="border border-gray-600 py-2.5 px-4 w-[25%] font-medium">作品名称</th>
                  <th className="border border-gray-600 py-2.5 px-4 w-[25%] font-medium">作者</th>
                  <th className="border border-gray-600 py-2.5 px-4 w-[50%] font-medium">推荐理由</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((rec, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-600 p-0">
                      <input
                        type="text"
                        value={rec.title}
                        onChange={(e) => {
                          const newRecs = [...recommendations];
                          newRecs[index].title = e.target.value;
                          setRecommendations(newRecs);
                        }}
                        onFocus={() => setFocusedInputId(`rec-title-${index}`)}
                        className="w-full h-11 px-3 outline-none bg-transparent text-center focus:bg-indigo-50 transition-colors m-0 rounded-none border-none"
                      />
                    </td>
                    <td className="border border-gray-600 p-0">
                      <input
                        type="text"
                        value={rec.author}
                        onChange={(e) => {
                          const newRecs = [...recommendations];
                          newRecs[index].author = e.target.value;
                          setRecommendations(newRecs);
                        }}
                        onFocus={() => setFocusedInputId(`rec-author-${index}`)}
                        className="w-full h-11 px-3 outline-none bg-transparent text-center focus:bg-indigo-50 transition-colors m-0 rounded-none border-none"
                      />
                    </td>
                    <td className="border border-gray-600 p-0">
                      <input
                        type="text"
                        value={rec.reason}
                        onChange={(e) => {
                          const newRecs = [...recommendations];
                          newRecs[index].reason = e.target.value;
                          setRecommendations(newRecs);
                        }}
                        onFocus={() => setFocusedInputId(`rec-reason-${index}`)}
                        className="w-full h-11 px-3 outline-none bg-transparent text-center focus:bg-indigo-50 transition-colors m-0 rounded-none border-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allFilled || isSubmitted}
        className="w-full mt-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        {isSubmitted ? "已推荐" : "推荐"}
      </button>
    </section>
  );
}