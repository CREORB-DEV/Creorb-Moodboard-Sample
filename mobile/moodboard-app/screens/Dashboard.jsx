import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useMood } from "../context/MoodContext";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Dashboard() {
  const { moods } = useMood();

  return (
    <View className="flex-1 px-6 pt-12 bg-neutral-900">
      <View className="flex-row items-center justify-start gap-5 mb-8">
        <Image source={require("../assets/creorb_logo.png")} className="w-10 h-10" />
        <Text className="text-xl font-semibold text-white">Creorb Studio</Text>
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
              {/* TOP ROW: Date + Time */}
              <View className="flex-row items-center justify-between mb-3">
                <Text className="font-semibold text-white">{mood.dayLabel || "Today"}</Text>
                <Text className="text-neutral-400">{mood?.timestamp}</Text>
              </View>

              {/* EMOJI + TAG + DELETE ICON */}
              <View className="flex-row items-start justify-between my-4">

                {/* LEFT SIDE: EMOJI + CHIP + DESCRIPTION */}
                <View className="flex-row flex-1 gap-3">
                  <Text className="text-4xl">{mood?.emoji}</Text>

                  {/* LABEL + DESCRIPTION */}
                  <View className="flex-col flex-1">  {/* <--- FIXED HERE */}

                    {/* Mood Tag Chip */}
                    <View className="px-4 py-2 rounded-xl bg-[#D9D9D9] self-start">
                      <Text className="text-sm font-medium text-black">
                        {mood?.label || ""}
                      </Text>
                    </View>

                    {/* DESCRIPTION */}
                    <Text className="pl-2 mt-2 text-sm font-medium leading-6 tracking-tight text-neutral-300">
                      {mood?.description || ""}
                    </Text>


                  </View>
                </View>

                {/* DELETE ICON */}
                <TouchableOpacity className="ml-3" onPress={() => alert("Delete functionality not implemented yet")}>
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
