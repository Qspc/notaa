import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { ComponentProps } from "../../component/types";
import DropDownPicker from "react-native-dropdown-picker";

export default function Form() {
    const database = useSQLiteContext();
    const [form, setForm] = useState<ComponentProps>({
        name: "",
        amount: "",
    });
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [addAmount, setAddAmount] = useState("");

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
    const handleUpdate = async () => {
        if (!value) {
            Alert.alert("Error", "Please select a component to update");
            return;
        }
        try {
            const current = await database.getFirstAsync<ComponentProps>(
                "SELECT amount FROM Components WHERE id = ?",
                [value]
            );
            const oldAmount = parseInt(current?.amount as string, 10) || 0;
            const add = parseInt(addAmount as string, 10) || 0;
            const newAmount = oldAmount + add;
            const res = await database.runAsync(
                "UPDATE Components SET amount = ? WHERE id = ?",
                [newAmount, value]
            );
            Alert.alert("Success", "Komponen berhasil di update");
            setAddAmount("");
        } catch (error) {
            console.error("Error updating data:", error);
            Alert.alert("Error", "Failed to update data");
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await database.getAllAsync<ComponentProps>(
                    "SELECT * FROM Components"
                );
                setData(
                    result.map((item) => ({
                        label: item.name,
                        value: item.id,
                    }))
                );
            } catch (error) {
                console.error("Error fetching data:", error);
                Alert.alert("Error", "Failed to fetch data");
            }
        };
        getData();
    }, [data]);

    return (
        <View style={{ flex: 1, gap: 10, padding: 20 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Data Pegawai
                </Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={data}
                    setOpen={setOpen}
                    setValue={setValue}
                    searchable={true}
                />
                <View
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                    <TextInput
                        id="amountUpdated"
                        placeholder="tambah nilai"
                        keyboardType="numeric"
                        style={{
                            minWidth: 160,
                            borderColor: "blue",
                            borderWidth: 1,
                            padding: 10,
                        }}
                        value={addAmount}
                        onChangeText={(text) => setAddAmount(text)}
                    />
                    <Button title="update" onPress={handleUpdate} />
                </View>
            </View>
            <View>
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
            </View>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}
