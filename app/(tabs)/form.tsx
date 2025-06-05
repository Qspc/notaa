import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { ComponentProps } from "../../component/types";

export default function Form() {
    const [form, setForm] = useState<ComponentProps>({
        name: "",
        amount: "",
    });
    const [data, setData] = useState<ComponentProps[]>([]);
    const database = useSQLiteContext();

    const handleSubmit = async () => {
        try {
            const res = await database.runAsync(
                "INSERT INTO Components (name, amount) VALUES (?, ?)",
                [form.name, parseInt(form.amount as string, 10) || 0]
            );
            Alert.alert(JSON.stringify(res));
        } catch (error) {
            console.error("Error inserting data:", error);
            Alert.alert("Error", "Failed to insert data");
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await database.getAllAsync<ComponentProps>(
                    "SELECT * FROM Components"
                );
                setData(result || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                Alert.alert("Error", "Failed to fetch data");
            }
        };
        getData();
    }, [data]);

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
                    setForm({
                        ...form,
                        name: text,
                    })
                }
                value={form.name}
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
                    setForm({
                        ...form,
                        amount: text,
                    })
                }
                value={String(form.amount)}
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
