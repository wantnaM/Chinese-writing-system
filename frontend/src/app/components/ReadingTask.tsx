import { useState, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';

interface ReadingTaskProps {
  title: string;
  content: string;
  onComplete?: () => void;
}

export function ReadingTask({ title, content, onComplete }: ReadingTaskProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (onComplete) {
      onComplete();
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg mb-4 text-gray-800">{title}</h3>
      
      <div className="bg-amber-50 rounded-lg p-6 mb-6 border-l-4 border-amber-500">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      <div className="flex items-center gap-4">
        {!isRecording && !hasRecording && (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Mic className="w-5 h-5" />
            开始录音
          </button>
        )}

        {isRecording && (
          <>
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Square className="w-5 h-5" />
              停止录音
            </button>
            <div className="flex items-center gap-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="font-mono">{formatTime(recordingTime)}</span>
            </div>
          </>
        )}

        {hasRecording && !isRecording && (
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayback}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? '暂停播放' : '播放录音'}
            </button>
            <button
              onClick={() => {
                setHasRecording(false);
                setRecordingTime(0);
              }}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              重新录制
            </button>
            <span className="text-sm text-gray-600">时长: {formatTime(recordingTime)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
