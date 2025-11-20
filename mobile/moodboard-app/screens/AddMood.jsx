import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function AddMood({ route }) {
  const selectedEmoji = route?.params?.emoji || "🙂";
  const [text, setText] = useState("");

  return (
    <View className="flex-1 px-6 pt-12 bg-neutral-900">
      <Text className="mb-2 text-4xl text-white">{selectedEmoji}</Text>

      <TextInput
        multiline
        placeholder="Describe your feeling..."
        placeholderTextColor="#8e8e8e"
        value={text}
        onChangeText={setText}
        className="h-48 p-4 text-white bg-neutral-800 rounded-xl"
      />

      <TouchableOpacity className="items-center py-3 mt-6 bg-blue-500 rounded-full">
        <Text className="text-lg font-semibold text-white">Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
