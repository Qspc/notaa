import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

export default function Form() {
    const [data, setData] = useState({
        name: "",
        amount: "",
    });
    const database = useSQLiteContext();

    const handleSubmit = async () => {
        try {
            const res = await database.runAsync(
                "INSERT INTO Components (name, amount) VALUES (?, ?)",
                [data.name, parseInt(data.amount, 10) || 0]
            );
            Alert.alert(JSON.stringify(res));
        } catch (error) {
            console.error("Error inserting data:", error);
            Alert.alert("Error", "Failed to insert data");
        }
    };

    return (
        <View style={{ flex: 1, gap: 10, padding: 20 }}>
            <Text>Form Tambah pegawai</Text>
            <TextInput
                id="name"
                placeholder="Masukkan atribut"
                style={{
                    minWidth: 160,
                    borderColor: "blue",
                    borderWidth: 1,
                    padding: 10,
                }}
                onChangeText={(text) =>
                    setData({
                        ...data,
                        name: text,
                    })
                }
                value={data.name}
            />
            <TextInput
                id="amount"
                placeholder="Masukkan nilai"
                style={{
                    minWidth: 160,
                    borderColor: "blue",
                    borderWidth: 1,
                    padding: 10,
                }}
                onChangeText={(text) =>
                    setData({
                        ...data,
                        amount: text,
                    })
                }
                value={String(data.amount)}
            />
            <Button title="Submit" onPress={handleSubmit} />
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
