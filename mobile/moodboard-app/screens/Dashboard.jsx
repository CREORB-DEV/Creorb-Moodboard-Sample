import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useMood } from "../context/MoodContext";
import { useAuth } from "../context/AuthContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';


export default function Dashboard() {
  const { moods, deleteMood, clearMoods } = useMood();
  const { logout } = useAuth();

  const handleDelete = (moodId) => {
    Alert.alert(
      "Delete Mood",
      "Are you sure you want to delete this mood?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteMood(moodId) },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: async () => {
            clearMoods();
            await logout();
          }
        },
      ]
    );
  };

  return (
    <View className="flex-1 px-6 pt-12 bg-neutral-900">
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center gap-5">
          <Image source={require("../assets/creorb_logo.png")} className="w-10 h-10" />
          <Text className="text-xl font-semibold text-white">Creorb Studio</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} className="p-2">
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="mb-6 text-2xl font-semibold text-white">Your MoodBoard</Text>

      <ScrollView className="flex-1 mb-6">

        {moods.length === 0 ? (
          <Text className="font-bold text-neutral-400">No entries added yet.</Text>
        ) : (
          moods.map((mood) => (
            <View
              key={mood.id}
              className="w-full h-auto p-4 mb-4 rounded-2xl bg-neutral-800"
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text className="font-semibold text-white">{mood.dayLabel || "Today"}</Text>
                <Text className="text-neutral-400">{mood?.timestamp || ""}</Text>
              </View>

              <View className="flex-row items-start justify-between my-4">
                <View className="flex-row flex-1 gap-3">
                  <Text className="text-4xl">{mood?.emoji || "😐"}</Text>

                  <View className="flex-col flex-1">
                    <View className="px-4 py-2 rounded-xl bg-[#D9D9D9] self-start">
                      <Text className="text-sm font-medium text-black">
                        {mood?.label || "Mood"}
                      </Text>
                    </View>

                    <Text className="pl-2 mt-2 text-sm font-medium leading-6 tracking-tight text-neutral-300">
                      {mood?.description || "No description"}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity className="ml-3" onPress={() => handleDelete(mood.id)}>
                  <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
              </View>



            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
