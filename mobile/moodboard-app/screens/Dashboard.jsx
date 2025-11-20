import { View, Text } from "react-native";

export default function Dashboard() {
  return (
    <View className="items-center justify-center flex-1 px-6 pt-12 bg-neutral-900">
      <Text className="mb-6 text-2xl text-white">Your MoodBoard</Text>
      <Text className="font-bold text-neutral-400">No entries added yet.</Text>
    </View>
  );
}
