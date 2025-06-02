import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { useState } from "react";

export default function TabTwoScreen() {
    const [value, setValue] = useState("");

    return (
        <View className="items-center justify-center w-full h-full">
            <Text className="text-[20px] text-blue-500 capitalize font-bold">
                tentukan budget
            </Text>
            <TextInput
                className="min-w-40 px-4 py-2 mt-4 text-[20px] text-blue-500 border border-blue-500 rounded-lg"
                onChangeText={(text) => setValue(text)}
                value={value}
            />
            <Button title="Press me" onPress={() => Alert.alert(value)} />
        </View>
    );
}
