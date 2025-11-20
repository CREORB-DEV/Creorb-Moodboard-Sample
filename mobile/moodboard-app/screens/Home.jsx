import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const EMOJIS = ["😀", "🙂", "😐", "😕", "😢", "😡"];

export default function Home({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <View className="flex-1 px-6 pt-12 bg-neutral-900">
      <Text className="mb-6 text-xl text-white">Select your mood</Text>

      <View className="flex-row flex-wrap justify-between">
        {EMOJIS.map((e, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setSelected(e)}
            className="items-center justify-center w-20 h-20 mb-4 bg-neutral-800 rounded-xl"
          >
            <Text className="text-3xl">{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        disabled={!selected}
        onPress={() => navigation.navigate("MainTabs", { emoji: selected })}
        className="items-center py-3 mt-auto mb-8 bg-blue-600 rounded-full"
      >
        <Text className="font-semibold text-white">Choose</Text>
      </TouchableOpacity>
    </View>
  );
}
