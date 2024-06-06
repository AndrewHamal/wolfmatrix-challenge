import { ComponentType } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface IInput extends TextInputProps {
    label?: string
    enableClear?: boolean
    RightComponent?: ComponentType
    LeftComponent?: ComponentType
}

export default function Input(props: IInput) {
    const {
        label,
        enableClear,
        LeftComponent,
        RightComponent,
        ...rest
    } = props;

    return (
        <View>
            {label && <Text className="font-[Poppins-Regular] text-[16px] mb-2">{label}</Text>}
            <View className={`px-3 flex-row bg-gray-100 items-center rounded-xl h-[50px]`}>
                {!!LeftComponent && <LeftComponent />}
                <TextInput
                    placeholderTextColor={"#A6A6A6"}
                    className={`font-[Poppins-Regular] w-[100%] px-2 text-[16px]`}
                    {...rest}
                />
                {!!RightComponent && <RightComponent />}
            </View>
        </View>
    )
}