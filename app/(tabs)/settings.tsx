import { View, Text, StyleSheet } from "react-native";

export default function Setting() {
    return (
        <View style={styles.container}>
            <Text>Tab [Settings]</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
