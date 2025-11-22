import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { authService } from "../services/authService";
import { useMood } from "../context/MoodContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { loadMoods, clearMoods } = useMood();

  const handleLogin = async () => {
    if (!email || !pass) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter email and password",
      });
      return;
    }

    setLoading(true);
    try {
      // Clear old moods before login
      clearMoods();
      
      await authService.login(email, pass);
      
      // Load moods for the new user
      await loadMoods();
      
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful!",
      });
      navigation.navigate("MainTabs");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.error || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="justify-between flex-1 px-6 py-11 bg-neutral-900">
      <View className="justify-center flex-1">
        <View className="flex-row items-center justify-center gap-5 mb-12">
          <Image source={require('../assets/creorb_logo.png')} className=" w-14 h-14" />
          <Text className="text-2xl font-semibold text-center text-white ">Creorb Studio</Text>
        </View>
        <View className="gap-5">
          <View>
            <Text className="mb-3 text-xl font-semibold text-white">Email</Text>
            <TextInput
              placeholder="your@email.com"
              placeholderTextColor="#8e8e8e"
              className="px-4 py-5 mb-4 text-white rounded-full bg-neutral-800"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
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
              editable={!loading}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="px-10 py-5 bg-blue-600 rounded-full"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-xl font-bold text-center text-white">Login</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
