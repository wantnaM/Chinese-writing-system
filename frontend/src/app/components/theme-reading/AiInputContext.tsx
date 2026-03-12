import React, { createContext, useContext, useState } from "react";

interface AiInputContextType {
  focusedInputId: string | null;
  setFocusedInputId: (id: string | null) => void;
  insertText: (id: string, text: string) => void;
  subscribeToInsert: (id: string, callback: (text: string) => void) => () => void;
}

export const AiInputContext = createContext<AiInputContextType | null>(null);

export function useAiInput() {
  const context = useContext(AiInputContext);
  if (!context) {
    throw new Error("useAiInput must be used within an AiInputProvider");
  }
  return context;
}

export function AiInputProvider({ children }: { children: React.ReactNode }) {
  const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
  
  // Store callbacks for each input
  const [subscribers] = useState<Map<string, (text: string) => void>>(new Map());

  const insertText = (id: string, text: string) => {
    const callback = subscribers.get(id);
    if (callback) {
      callback(text);
    }
  };

  const subscribeToInsert = (id: string, callback: (text: string) => void) => {
    subscribers.set(id, callback);
    return () => {
      subscribers.delete(id);
    };
  };

  return (
    <AiInputContext.Provider
      value={{
        focusedInputId,
        setFocusedInputId,
        insertText,
        subscribeToInsert,
      }}
    >
      {children}
    </AiInputContext.Provider>
  );
}