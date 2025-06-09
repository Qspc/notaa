import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("window").height;

export const background = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minHeight: "100%",
    },
    section: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 40,
    },
});
