import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function Empty() {
    return (
        <View className="flex-row items-center gap-1">
            <Feather name="info" size={15} />
            <Text className="font-[Poppins-Regular]"> No result found!</Text>
        </View>
    )
}