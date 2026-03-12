import React, { useState, useEffect } from "react";
import { MessageSquarePlus, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type AnnotationType = "builtin" | "user";

export interface Annotation {
  id: string;
  start: number;
  end: number;
  note: string;
  type: AnnotationType;
}

export interface ArticleBlockProps {
  id: string;
  tag: string;
  title: string;
  author: string;
  allowAnnotation?: boolean;
  paragraphs: {
    text: string;
    annotations: Annotation[];
  }[];
}

import { useAiInput } from "./AiInputContext";

export function ArticleBlock({ article }: { article: ArticleBlockProps }) {
  const { setFocusedInputId, subscribeToInsert } = useAiInput();
  const [userAnnotations, setUserAnnotations] = useState<Record<number, Annotation[]>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const [selectionPopup, setSelectionPopup] = useState<{
    paraIndex: number;
    start: number;
    end: number;
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const [editingNote, setEditingNote] = useState<{
    paraIndex: number;
    start: number;
    end: number;
    text: string;
  } | null>(null);
  
  const [draftNote, setDraftNote] = useState("");

  useEffect(() => {
    const handleScroll = () => setSelectionPopup(null);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent, paraIndex: number) => {
    if (!article.allowAnnotation) return;

    const currentTarget = e.currentTarget as HTMLElement;

    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const range = selection.getRangeAt(0);
      if (!currentTarget || !currentTarget.contains(range.commonAncestorContainer)) return;

      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(currentTarget);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;
      const text = range.toString();
      const end = start + text.length;

      if (text.trim().length > 0) {
        const rect = range.getBoundingClientRect();
        setSelectionPopup({
          paraIndex,
          start,
          end,
          text: text.trim(),
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
      }
    }, 50);
  };

  const getNotesForParagraph = (index: number) => {
    const builtin = article.paragraphs[index].annotations || [];
    const user = userAnnotations[index] || [];
    return [...builtin, ...user].sort((a, b) => a.start - b.start);
  };

  const saveNote = () => {
    if (!editingNote || !draftNote.trim()) return;

    const newNote: Annotation = {
      id: `u-${Date.now()}`,
      start: editingNote.start,
      end: editingNote.end,
      note: draftNote,
      type: "user",
    };

    setUserAnnotations((prev) => {
      const paraNotes = prev[editingNote.paraIndex] || [];
      return {
        ...prev,
        [editingNote.paraIndex]: [...paraNotes, newNote],
      };
    });

    setEditingNote(null);
    setDraftNote("");
    setActiveNoteId(newNote.id);
    window.getSelection()?.removeAllRanges();
  };

  const renderParagraphSegments = (text: string, notes: Annotation[]) => {
    const validNotes: Annotation[] = [];
    let lastEnd = 0;
    for (const n of notes) {
      if (n.start >= lastEnd && n.start < n.end) {
        validNotes.push(n);
        lastEnd = n.end;
      }
    }

    const segments: React.ReactNode[] = [];
    let currentIdx = 0;

    validNotes.forEach((note) => {
      if (note.start > currentIdx) {
        segments.push(<span key={`text-${currentIdx}`}>{text.substring(currentIdx, note.start)}</span>);
      }

      const isUser = note.type === "user";
      const isActive = activeNoteId === note.id;

      segments.push(
        <span
          key={`note-${note.id}`}
          onClick={() => setActiveNoteId(isActive ? null : note.id)}
          className={`
            cursor-pointer transition-colors duration-200
            ${isUser ? "border-b-2 border-amber-500 hover:bg-amber-100/50" : "border-b border-gray-600 hover:bg-gray-200/50"}
            ${isActive && isUser ? "bg-amber-100/80 text-amber-900" : ""}
            ${isActive && !isUser ? "bg-amber-100 text-black font-medium" : ""}
          `}
        >
          {text.substring(note.start, note.end)}
        </span>
      );
      currentIdx = note.end;
    });

    if (currentIdx < text.length) {
      segments.push(<span key={`text-${currentIdx}`}>{text.substring(currentIdx)}</span>);
    }

    return segments;
  };

  useEffect(() => {
    const unsub = subscribeToInsert("article-note-draft", (text) => {
      setDraftNote(prev => prev + (prev ? "\n" : "") + text);
    });
    return () => unsub();
  }, [subscribeToInsert]);

  return (
    <div
      className="relative font-serif"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("#selection-popup") && !target.closest(".modal-content")) {
          setSelectionPopup(null);
        }
      }}
      onTouchStart={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("#selection-popup") && !target.closest(".modal-content")) {
          setSelectionPopup(null);
        }
      }}
    >
      <div className="bg-[#FFFDF5] rounded-2xl shadow-xl p-8 sm:p-12 mb-12 relative border-2 border-amber-200">
        <div className="absolute top-0 left-0 bg-amber-500 text-white px-6 py-2 rounded-br-2xl rounded-tl-xl font-sans font-bold text-lg shadow-md z-20">
          {article.tag}
        </div>

        {article.allowAnnotation && (
          <div className="absolute top-4 right-4 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium border border-amber-200 shadow-sm z-20 hidden md:block font-sans">
            选中文章的文字可添加批注
          </div>
        )}

        <div className="text-center mb-10 pt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-widest font-sans">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 tracking-widest">
            {article.author}
          </p>
        </div>

        <div className="flex flex-col">
          {article.paragraphs.map((p, i) => {
            const notes = getNotesForParagraph(i);
            return (
              <div className="flex relative flex-col md:flex-row" key={i}>
                <div className="flex-1 md:pr-8 md:border-r-2 border-dashed border-amber-200 pb-8">
                  <p
                    className="indent-8 text-gray-800 leading-[2.5] text-lg md:text-xl text-justify selection:bg-amber-200/50"
                    onMouseUp={(e) => handleMouseUp(e, i)}
                    onTouchEnd={(e) => handleMouseUp(e, i)}
                  >
                    {renderParagraphSegments(p.text, notes)}
                  </p>
                </div>
                <div className="w-full md:w-[180px] shrink-0 md:pl-6 pb-8 flex flex-col justify-start space-y-4 pt-2">
                  {notes.map((note) => {
                    const isUser = note.type === "user";
                    const isActive = activeNoteId === note.id;
                    return (
                      <div
                        key={note.id}
                        onClick={() => setActiveNoteId(isActive ? null : note.id)}
                        className={`
                          p-3 cursor-pointer transition-all duration-300 text-left relative group font-sans
                          ${isUser ? `rounded-lg border ${isActive ? "bg-amber-50 border-amber-300 shadow-sm" : "bg-white border-amber-100 hover:bg-amber-50/50"}` : `border-l-2 ${isActive ? "border-amber-500 bg-amber-100/50 font-medium text-gray-900" : "border-transparent text-gray-600 hover:text-gray-800"}`}
                        `}
                      >
                        <p className={`leading-relaxed ${isUser ? "text-amber-900 font-sans" : "font-serif"} text-[14px]`}>
                          {note.note}
                        </p>
                        {isUser && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setUserAnnotations((prev) => {
                                const paraNotes = prev[i] || [];
                                return {
                                  ...prev,
                                  [i]: paraNotes.filter((n) => n.id !== note.id),
                                };
                              });
                            }}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors bg-white/80 rounded-full p-0.5 shadow-sm"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectionPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            id="selection-popup"
            className="fixed z-40 transform -translate-x-1/2 -translate-y-full pb-3"
            style={{ left: selectionPopup.x, top: selectionPopup.y }}
          >
            <div className="bg-gray-800 text-white p-1.5 rounded-lg shadow-xl flex items-center">
              <button
                className="flex items-center gap-1.5 hover:bg-gray-700 px-3 py-1.5 rounded text-sm transition-colors font-sans whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingNote(selectionPopup);
                  setSelectionPopup(null);
                }}
              >
                <MessageSquarePlus className="w-4 h-4" />
                添加批注
              </button>
            </div>
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F9F9F9] rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-200 modal-content"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5" />
                添加批注
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-serif italic border-l-4 border-gray-300 pl-3 py-1 bg-gray-200/50 rounded-r line-clamp-3">
                  "{editingNote.text}"
                </p>
              </div>
              <textarea
                autoFocus
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white resize-none outline-none text-gray-800 text-sm"
                placeholder="写下你的批注、感悟或疑问..."
                value={draftNote}
                onFocus={() => setFocusedInputId("article-note-draft")}
                onChange={(e) => setDraftNote(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-5">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                  onClick={() => {
                    setEditingNote(null);
                    setDraftNote("");
                    window.getSelection()?.removeAllRanges();
                  }}
                >
                  取消
                </button>
                <button
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md flex items-center gap-1 text-sm font-medium"
                  onClick={saveNote}
                >
                  <Check className="w-4 h-4" />
                  保存
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}