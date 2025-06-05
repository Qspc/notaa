import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { BudgetProps } from "../../component/types";
import { formatThreeDigit } from "../../component/helper";

export default function Budget() {
    const [data, setData] = useState("");
    const database = useSQLiteContext();
    const [isBudget, setIsBudget] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (isUpdated) => {
        try {
            if (isUpdated) {
                const res = await database.runAsync(
                    "UPDATE Budgets SET amount = ?",
                    [parseInt(data, 10) || 0]
                );
                Alert.alert("Success", "Budget berhasil diperbarui");
                setAmount(parseInt(data, 10) || 0);
            } else {
                const res = await database.runAsync(
                    "INSERT INTO Budgets (amount) VALUES (?)",
                    [parseInt(data, 10) || 0]
                );
                Alert.alert("Success", "Budget berhasil ditambahkan");
            }
            setIsBudget(true);
            setShowForm(false);
        } catch (error) {
            console.error("Error inserting data:", error);
            Alert.alert("Error", "Failed to insert data");
        }
    };
    const handleDelete = async () => {
        try {
            const res = await database.runAsync("DELETE FROM Budgets");
            setIsBudget(false);
            setShowForm(true);
            Alert.alert("Success", "Budget berhasil dihapus");
        } catch (error) {
            console.error("Error  data:", error);
            Alert.alert("Error", "Failed to delete data");
        }
    };

    useEffect(() => {
        const getData = async () => {
            const result = await database.getAllAsync<BudgetProps>(
                "SELECT * FROM Budgets"
            );
            if (result && result.length > 0) {
                setIsBudget(true);
                setShowForm(false);
                setAmount(result[0].amount);
                setData(String(result[0].amount));
            } else {
                setShowForm(true);
                setIsBudget(false);
                setData("");
            }
        };
        getData();
    }, [isBudget]);

    return (
        <View style={{ flex: 1, gap: 10, padding: 20 }}>
            {isBudget ? (
                <Text>Budget Kamu: Rp{formatThreeDigit(amount)}</Text>
            ) : (
                <Text>Tambahkan Budget</Text>
            )}
            {showForm ? (
                <>
                    <TextInput
                        id="amount"
                        placeholder="Masukkan nilai"
                        style={{
                            minWidth: 160,
                            borderColor: "blue",
                            borderWidth: 1,
                            padding: 10,
                        }}
                        // onBlur={(v) => formatThreeDigit(v.nativeEvent.text)}
                        keyboardType="numeric"
                        onChangeText={(text) => setData(text)}
                        value={data}
                    />
                    {data ? (
                        <View
                            style={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "row",
                                gap: 10,
                            }}
                        >
                            <Button
                                title={"Edit"}
                                onPress={() => {
                                    handleSubmit(true);
                                }}
                            />
                            <Button
                                title={"batal"}
                                color={"red"}
                                onPress={() => {
                                    setShowForm(false);
                                }}
                            />
                        </View>
                    ) : (
                        <Button
                            title={data ? "Edit" : "Submit"}
                            onPress={() => {
                                handleSubmit(data ? true : false);
                            }}
                        />
                    )}
                </>
            ) : (
                <>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            gap: 10,
                        }}
                    >
                        <Button
                            title="Ubah Budget"
                            onPress={() => {
                                setShowForm(true);
                            }}
                        />
                        <Button
                            color={"red"}
                            title="Hapus Budget"
                            onPress={handleDelete}
                        />
                    </View>
                </>
            )}
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
