import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View className="justify-center flex-1 px-6 bg-neutral-900">
      <Text className="mb-8 text-xl text-center text-white">Creorb Studio</Text>

      <TextInput
        placeholder="Login"
        placeholderTextColor="#8e8e8e"
        className="px-4 py-3 mb-4 text-white rounded-full bg-neutral-800"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#8e8e8e"
        className="px-4 py-3 mb-6 text-white rounded-full bg-neutral-800"
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="py-3 bg-blue-600 rounded-full"
      >
        <Text className="font-semibold text-center text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
