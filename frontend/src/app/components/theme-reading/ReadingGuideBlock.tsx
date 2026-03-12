import React, { useState, useRef } from "react";
import { BookMarked, Play, Pause, Volume2 } from "lucide-react";
import { ReadingGuideBlockData } from "../../data/themeReadingMock";

export function ReadingGuideBlock({ block }: { block: ReadingGuideBlockData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setTimeout(() => {
            setIsPlaying(false);
          }, 8000);
        });
      }
    }
  };

  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-green-200 mb-8">
      <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
        <BookMarked className="w-6 h-6 text-green-600" />
        {block.title}
      </h2>

      {/* Reading Guide */}
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-green-800 mb-2">
          激趣指引：
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {block.guideText}
        </p>
      </div>

      {/* Reading Content with Audio */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-300">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-green-900">
            {block.articleTitle}
          </h3>

          {block.audioUrl && (
            <>
              <audio
                ref={audioRef}
                src={block.audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              <button
                onClick={togglePlayback}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isPlaying
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    暂停
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    朗读
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {isPlaying && (
          <div className="mb-4 bg-amber-100 border border-amber-300 rounded-lg p-3 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
            <span className="text-amber-800 font-medium">
              正在朗读音频中...
            </span>
          </div>
        )}

        <div className="space-y-4 text-gray-800 leading-relaxed">
          {block.paragraphs.map((p, idx) => (
            <p key={idx} className="indent-8 text-sm md:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}