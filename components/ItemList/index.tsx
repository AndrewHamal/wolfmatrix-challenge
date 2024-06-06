import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Item = {
    id: number,
    title: string,
    completed: boolean
}

interface IItemList {
    item: Item
    selectedItem: Array<number>
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>
}

export default memo(function ItemList({ selectedItem, setSelectedItem, item }: IItemList) {

    const handlePress = () => {
        setSelectedItem((prev: any) => {
            let selected = prev;
            if (prev?.find((res: any) => res === item.id)) {
                selected = selected.filter((res: any) => res !== item.id);
            } else {
                selected = [...prev, item.id];
            }

            return selected;
        })
    }

    return (
        <TouchableOpacity onPress={handlePress} className={`${selectedItem.includes(item.id) ? 'border-green-200 bg-green-50' : 'border-blue-200  bg-blue-50'} mb-3 border rounded-xl p-3`}>
            <View className="flex-row items-center gap-2 mb-2">
                {
                    selectedItem.includes(item.id) && <View className="">
                        <Feather name="check-square" color={'green'} size={15} />
                    </View>
                }

                <Text className="font-[Poppins-Regular]">#{item.id}</Text>
                {
                    item.completed ? <View className="border border-green-500 bg-green-50 px-2 py-[2px] rounded-md">
                        <Text className="text-[10px] font-[Poppins-Light]">Completed</Text>
                    </View> : <View className="border border-red-500 bg-red-50 px-2 py-[2px] rounded-md">
                        <Text className="text-[10px] font-[Poppins-Light]">Incomplete</Text>
                    </View>
                }
            </View>
            <Text className="font-[Poppins-Regular] capitalize">{item.title}</Text>
        </TouchableOpacity>
    )
})