import { View, Text, StyleSheet, Alert } from "react-native";
import { ComponentProps } from "../../component/types";
import React, { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

export default function Tab() {
    const [data, setData] = useState<ComponentProps>(null);

    const database = useSQLiteContext();

    const loadData = async () => {
        const result = await database.getAllAsync<ComponentProps>(
            "SELECT * FROM Components"
        );
        Alert.alert(JSON.stringify(result));
        setData(result[0] || null);
    };

    useEffect(() => {
        loadData();
    }, []);

    // useFocusEffect(() => {
    //     useCallback(() => {
    //         loadData();
    //     }, []);
    // });

    return (
        <View style={styles.container}>
            <Text>Tab [Home|Settings]</Text>
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
