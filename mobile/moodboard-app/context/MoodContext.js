import { createContext, useContext, useState, useEffect } from "react";
import { moodService } from "../services/moodService";
import { authService } from "../services/authService";
import Toast from "react-native-toast-message";

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load moods when component mounts
  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      if (!isAuth) return;

      setLoading(true);
      const fetchedMoods = await moodService.getMoods();
      
      // Transform backend moods to match frontend format
      const transformedMoods = fetchedMoods.map((mood) => ({
        id: mood.id,
        emoji: getEmojiFromMood(mood.mood),
        label: mood.mood,
        description: mood.note,
        timestamp: new Date(mood.date).toLocaleTimeString(),
        dayLabel: new Date(mood.date).toDateString(),
        date: mood.date,
      }));
      
      setMoods(transformedMoods);
    } catch (error) {
      console.error("Failed to load moods:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMood = async (emoji, label, description) => {
    try {
      const date = new Date().toISOString();
      
      // Save to backend
      const savedMood = await moodService.createMood(label, description, date);
      
      // Add to local state
      const newMood = {
        id: savedMood.id,
        emoji,
        label,
        description,
        timestamp: new Date(savedMood.date).toLocaleTimeString(),
        dayLabel: new Date(savedMood.date).toDateString(),
        date: savedMood.date,
      };

      setMoods([newMood, ...moods]);
      return true;
    } catch (error) {
      console.error("Failed to add mood:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.error || "Failed to save mood",
      });
      return false;
    }
  };

  const deleteMood = async (id) => {
    try {
      await moodService.deleteMood(id);
      setMoods(moods.filter((mood) => mood.id !== id));
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Mood deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete mood:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.error || "Failed to delete mood",
      });
    }
  };

  const clearMoods = () => {
    setMoods([]);
  };

  // Helper function to map mood label to emoji
  const getEmojiFromMood = (moodLabel) => {
    const emojiMap = {
      Happy: "😀",
      Good: "🙂",
      Neutral: "😐",
      Confused: "😕",
      Sad: "😢",
      Angry: "😡",
    };
    return emojiMap[moodLabel] || "😐";
  };

  return (
    <MoodContext.Provider value={{ moods, addMood, deleteMood, loadMoods, clearMoods, loading }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}
