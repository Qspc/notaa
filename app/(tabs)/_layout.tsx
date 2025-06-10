import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="form"
                options={{
                    title: "Form",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            size={28}
                            name="sticky-note"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="anggaran"
                options={{
                    title: "Anggaran",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="dollar" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
