import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { BudgetProps } from "../../component/types";
import { formatThreeDigit } from "../../component/helper";
import { background } from "../styles/style";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Budget() {
    const [data, setData] = useState("");
    const database = useSQLiteContext();
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();

    const { data: amount } = useQuery({
        queryKey: ["budget", "amount"],
        queryFn: async () => {
            const res = await database.getAllAsync<BudgetProps>(
                "SELECT * FROM Budgets"
            );
            if (res && res.length > 0) {
                setShowForm(false);
                setData(String(res[0].amount));
                return res[0].amount || 0;
            } else {
                setShowForm(true);
                setData("");
                return 0;
            }
        },
    });
    const post = useMutation({
        mutationFn: async ({ isUpdated }: any) => {
            if (isUpdated === "create")
                await database.runAsync(
                    "INSERT INTO Budgets (amount) VALUES (?)",
                    [parseInt(data, 10) || 0]
                );
            if (isUpdated === "update") {
                await database.runAsync("UPDATE Budgets SET amount = ?", [
                    parseInt(data, 10) || 0,
                ]);
            }
            if (isUpdated === "delete") {
                await database.runAsync("DELETE FROM Budgets");
            }
        },
    });

    const handleSubmit = async (isUpdated: boolean) => {
        try {
            if (!data || data === "") {
                Alert.alert("Error", "Anggaran tidak boleh kosong");
                setData(amount ? String(amount) : "");
                setShowForm(false);
                return;
            }
            if (isUpdated) {
                const res = await database.runAsync(
                    "UPDATE Budgets SET amount = ?",
                    [parseInt(data, 10) || 0]
                );
                Alert.alert("Success", "Anggaran berhasil diperbarui");
                // setAmount(parseInt(data, 10) || 0);
            } else {
                const res = await database.runAsync(
                    "INSERT INTO Budgets (amount) VALUES (?)",
                    [parseInt(data, 10) || 0]
                );
                Alert.alert("Success", "Anggaran berhasil ditambahkan");
            }
            queryClient.invalidateQueries({
                queryKey: ["budget"],
                exact: false,
            });
            setShowForm(false);
        } catch (error) {
            console.error("Error inserting data:", error);
            Alert.alert("Error", "Failed to insert data");
        }
    };

    const handleDelete = async () => {
        try {
            await post.mutateAsync({
                isUpdated: "delete",
            });
            setData("");
            queryClient.invalidateQueries({
                queryKey: ["budget"],
                exact: false,
            });
            setShowForm(true);
            Alert.alert("Success", "Anggaran berhasil dihapus");
        } catch (error) {
            console.error("Error  data:", error);
            Alert.alert("Error", "Failed to delete data");
        }
    };

    return (
        <View style={background.container}>
            <View style={background.section}>
                <Text style={{ fontWeight: "semibold" }}>
                    {Number(amount) > 0 ? (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                            }}
                        >
                            <Text>Anggaran Kamu: </Text>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                Rp{formatThreeDigit(amount)}
                            </Text>
                        </View>
                    ) : (
                        `Tambahkan Anggaran Kamu`
                    )}{" "}
                </Text>
                {showForm ? (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        <TextInput
                            id="amount"
                            placeholder="80000"
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
                        <Button
                            title={amount ? "Edit" : "Submit"}
                            onPress={() => {
                                handleSubmit(amount ? true : false);
                            }}
                        />
                        {+amount > 0 && (
                            <Button
                                title={"batal"}
                                color={"red"}
                                onPress={() => {
                                    setShowForm(false);
                                }}
                            />
                        )}
                    </View>
                ) : (
                    <View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                gap: 10,
                            }}
                        >
                            <Button
                                title="Ubah Anggaran"
                                onPress={() => {
                                    setShowForm(true);
                                }}
                            />
                            <Button
                                color={"red"}
                                title="Hapus Anggaran"
                                onPress={handleDelete}
                            />
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}
