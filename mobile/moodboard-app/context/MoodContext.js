import { createContext, useContext, useState } from "react";

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [moods, setMoods] = useState([]);

const addMood = (emoji, label, description) => {
  const newMood = {
    id: Date.now(),
    emoji,       // string
    label,       // string
    description, // string
timestamp: String(new Date().toLocaleTimeString()),
    dayLabel: new Date().toDateString(),
  };

  setMoods([...moods, newMood]);
};




  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}
