import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMood } from "../context/MoodContext";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const EMOJIS = [
  { emoji: "😀", label: "Happy" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😕", label: "Confused" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

export default function AddMood() {
  const [step, setStep] = useState("select");
  const [selectedMoodObj, setSelectedMoodObj] = useState(null);
  const [description, setDescription] = useState("");

  const { moods, addMood } = useMood();
  const navigation = useNavigation();

  const handleChoose = () => {
    if (selectedMoodObj) {
      setStep("describe");
    }
  };

  const handleSubmit = async () => {
    if (description.trim()) {
      const success = await addMood(selectedMoodObj?.emoji, selectedMoodObj?.label, description);

      if (success) {
        Toast.show({
          type: "success",
          text1: "Mood added!",
          text2: "Your mood has been saved successfully 👌",
        });

        setDescription("");
        setSelectedMoodObj(null);
        setStep("select");
        
        // Navigate to Dashboard
        navigation.navigate("Dashboard");
      }
    }
  };

  const handleAddNew = () => {
    setStep("select");
    setSelectedMoodObj(null);
    setDescription("");
  };

  // ---------------------------
  // Step 1: Emoji Selection
  // ---------------------------
  if (step === "select") {
    return (
      <SafeAreaView className="flex-1 px-6 bg-neutral-900">
        <View className="flex-row items-center justify-start gap-5 mb-12">
          <Image source={require("../assets/creorb_logo.png")} className="w-10 h-10" />
          <Text className="text-xl font-semibold text-white">Creorb Studio</Text>
        </View>

        <Text className="mb-6 text-2xl font-semibold text-white">Select your mood</Text>

        <FlatList
          data={EMOJIS}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 20,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedMoodObj?.emoji === item.emoji;
            return (
              <TouchableOpacity
                onPress={() => setSelectedMoodObj(item)}
                className={`items-center justify-center w-24 h-24 rounded-xl ${isSelected ? "bg-blue-600" : "bg-neutral-800"}`}
              >
                <Text className="text-3xl">{item.emoji}</Text>
                <Text className="mt-1 text-xs text-white">{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          disabled={!selectedMoodObj}
          onPress={handleChoose}
          className={`items-center py-4 mt-auto mb-8 rounded-full ${selectedMoodObj ? "bg-blue-600" : "bg-neutral-700"}`}
        >
          <Text className="text-lg font-semibold text-white">Choose</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ---------------------------
  // Step 2: Describe Mood
  // ---------------------------
  if (step === "describe") {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 px-6 bg-neutral-900">
          <View className="flex-row items-center justify-start gap-5 mb-8">
            <Image source={require("../assets/creorb_logo.png")} className="w-10 h-10" />
            <Text className="text-xl font-semibold text-white">Creorb Studio</Text>
          </View>

          <View className="items-center justify-center mb-8">
            <Text className="text-2xl font-semibold text-center text-white">Write the Description</Text>
            <Text className="mb-6 text-xl text-center text-neutral-400">
              How did you feel today?
            </Text>

            {/* FIX: show just the emoji */}
            {selectedMoodObj?.emoji ? (
              <Text className="py-2 mb-6 text-6xl text-center">
                {selectedMoodObj.emoji}
              </Text>
            ) : null}

            <TextInput
              multiline
              placeholder="Describe your feeling..."
              placeholderTextColor="#8e8e8e"
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
              blurOnSubmit={true}
              returnKeyType="done"
              className="w-full px-4 py-5 mb-6 text-white h-2/5 bg-neutral-800 rounded-xl"
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="items-center py-4 mb-4 bg-blue-600 rounded-full"
          >
            <Text className="text-lg font-semibold text-white">Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStep("select")}
            className="items-center py-4 rounded-full bg-neutral-700"
          >
            <Text className="text-lg font-semibold text-white">Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  // ---------------------------
  // Step 3: Dashboard
  // ---------------------------
  return (
    <SafeAreaView className="flex-1 px-6 bg-neutral-900">
      <View className="flex-row items-center justify-start gap-5 mb-8">
        <Image source={require("../assets/creorb_logo.png")} className="w-10 h-10" />
        <Text className="text-xl font-semibold text-white">Creorb Studio</Text>
      </View>

      <Text className="mb-6 text-2xl font-semibold text-white">Your Moods</Text>

      <ScrollView className="flex-1 mb-4">
        {moods.length === 0 ? (
          <Text className="text-center text-neutral-500">No moods added yet</Text>
        ) : (
          moods.map((mood) => (
            <View key={mood.id} className="p-4 mb-4 bg-neutral-800 rounded-xl">
              <View className="flex-row items-center justify-between mb-2">
                <View>
                  <Text className="text-4xl">{mood.emoji}</Text>
                  <Text className="text-xs text-neutral-400">{mood.label}</Text>
                </View>
                <Text className="text-sm text-neutral-400">{mood?.timestamp || ""}</Text>
              </View>
              <Text className="text-white">{mood?.description || ""}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddNew}
        className="items-center py-4 mb-8 bg-blue-600 rounded-full"
      >
        <Text className="text-lg font-semibold text-white">Add New Mood</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
