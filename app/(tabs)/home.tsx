import { StyleSheet } from "react-native";
import "../../global.css";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
    return (
        <View className="items-center justify-center w-full h-full">
            <Text>Tab One</Text>
            <Text className="p-10 font-bold bg-blue-500">hahaha</Text>
            <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
        </View>
    );
}
