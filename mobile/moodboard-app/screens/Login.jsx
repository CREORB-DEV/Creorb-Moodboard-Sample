import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <SafeAreaView className="justify-between flex-1 px-6 py-11 bg-neutral-900">
    <View className="justify-center flex-1">
        <View className="flex-row items-center justify-center gap-5 mb-12">
        <Image source={require('../assets/creorb_logo.png')} className=" w-14 h-14" />
        <Text className="text-2xl font-semibold text-center text-white ">Creorb Studio</Text>

      </View>
      <View className="gap-5">
        <View>
          <Text className="mb-3 text-xl font-semibold text-white">Username</Text>
          <TextInput
            placeholder="Creorb@dev2025"
            placeholderTextColor="#8e8e8e"
            className="px-4 py-5 mb-4 text-white rounded-full bg-neutral-800"
            value={email}
            onChangeText={setEmail}
          />


        </View>
        <View>
          <Text className="mb-3 text-xl font-semibold text-white">Password</Text>
          <TextInput
            placeholder="********"
            secureTextEntry
            placeholderTextColor="#8e8e8e"
            className="px-4 py-5 mb-6 text-white rounded-full bg-neutral-800"
            value={pass}
            onChangeText={setPass}
          />
        </View>
      </View>
    </View>





      <TouchableOpacity
        onPress={() => navigation.navigate("MainTabs")}
        className="px-10 py-5 bg-blue-600 rounded-full"
      >
        <Text className="text-xl font-bold text-center text-white">Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
