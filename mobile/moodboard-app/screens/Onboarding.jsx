import { View, Text, TouchableOpacity } from "react-native";

export default function Onboarding({ navigation }) {
  return (
    <View className="items-center justify-center flex-1 px-6 bg-neutral-900">
      <Text className="mb-3 text-2xl font-semibold text-white">Welcome to Creorb!</Text>
      <Text className="mb-10 text-center text-neutral-400">
        This is a moodboard application
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="px-10 py-3 bg-blue-600 rounded-full"
      >
        <Text className="font-semibold text-white">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
