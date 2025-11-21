import { View, Text, TouchableOpacity,Image } from "react-native";
import Logo from '../assets/creorb_logo.png'
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding({ navigation }) {
  return (
    <SafeAreaView className="justify-between flex-1 px-6 py-11 bg-neutral-900">
    <View className="items-center justify-center flex-1 gap-12 px-6 bg-neutral-900">
      <Text className="text-2xl font-semibold text-white ">Welcome to Creorb!</Text>
      <Image source={Logo} className="w-32 h-32" />
      <Text className="text-xl text-center text-neutral-400">
        This is a moodboard application
      </Text>
 
    
    </View>
    <View>
        <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="px-10 py-5 bg-blue-600 rounded-full"
      >
        <Text className="text-xl font-bold text-center text-white">Get Started</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
