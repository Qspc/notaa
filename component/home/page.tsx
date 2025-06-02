import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";

export default function HomePage() {
    return (
        <View className="">
            <View className="flex items-center justify-center w-screen h-screen bg-grey-200">
                <Text className="text-red-600">Homepage</Text>
                {/* <StatusBar style="auto" /> */}
            </View>
        </View>
    );
}
