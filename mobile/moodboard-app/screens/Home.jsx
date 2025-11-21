import { View, Text, TouchableOpacity,Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const EMOJIS = ["😀", "🙂", "😐", "😕", "😢", "😡"];

export default function Home({ navigation }) {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView className="flex-1 px-6 bg-neutral-900">
      <View className="flex-row items-center justify-start gap-5 mb-12">
        <Image source={require('../assets/creorb_logo.png')} className="w-10 h-10 " />
        <Text className="text-xl font-semibold text-center text-white ">Creorb Studio</Text>

      </View>
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
    </SafeAreaView>
  );
}
