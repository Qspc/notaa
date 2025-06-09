import React from "react";
import { View, StyleSheet } from "react-native";

export const DividerVertical = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
    divider: {
        width: 10,
        alignSelf: "stretch",
        // backgroundColor: "transparent",
        borderLeftWidth: 6,
        // borderLeftColor: "#dde0e3",
        borderLeftColor: "#000000",
        backgroundColor: "000000",
        borderStyle: "dashed",
    },
});
