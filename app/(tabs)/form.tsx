import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { ComponentProps } from "../../component/types";
import DropDownPicker from "react-native-dropdown-picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { background } from "../styles/style";

export default function Form() {
    const database = useSQLiteContext();
    const [form, setForm] = useState<ComponentProps>({
        name: "",
        amount: "",
    });
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [addAmount, setAddAmount] = useState("");
    const [showForm, setShowForm] = useState(false);
    const queryClient = useQueryClient();

    const { data: compDropdown } = useQuery({
        queryKey: ["components", "dropdown"],
        queryFn: async () => {
            const res = await database.getAllAsync<ComponentProps>(
                "SELECT * FROM Components"
            );
            if (res && res.length > 0) {
                return res.map((item) => ({
                    label: item.name,
                    value: item.id,
                }));
            } else {
                return [];
            }
        },
    });
    const component = useMutation({
        mutationFn: async ({ isUpdated }: any) => {
            if (isUpdated === "create")
                await database.runAsync(
                    "INSERT INTO Components (name, amount) VALUES (?, ?)",
                    [form.name, parseInt(form.amount as string, 10) || 0]
                );
            if (isUpdated === "update") {
                const current = await database.getFirstAsync<ComponentProps>(
                    "SELECT amount FROM Components WHERE id = ?",
                    [value]
                );
                const oldAmount = parseInt(current?.amount as string, 10) || 0;
                const add = parseInt(addAmount as string, 10) || 0;
                const newAmount = oldAmount + add;
                await database.runAsync(
                    "UPDATE Components SET amount = ? WHERE id = ?",
                    [newAmount, value]
                );
            }
            if (isUpdated === "delete") {
                await database.runAsync("DELETE FROM Components WHERE id = ?", [
                    value,
                ]);
            }
        },
    });

    const handleForm = async (status: string) => {
        try {
            if (status === "create") {
                if (!form.name || !form.amount) {
                    Alert.alert("Error", "Nama dan nominal harus diisi");
                    return;
                }
                await component.mutateAsync({
                    isUpdated: "create",
                });
                setForm({
                    name: "",
                    amount: "",
                });
                Alert.alert("Success", "Pengeluaran berhasil ditambahkan");
            }
            if (status === "update") {
                setShowForm(false);
                if (!value) {
                    Alert.alert(
                        "Error",
                        "Pilih pengeluaran yang ingin diupdate"
                    );
                    return;
                }
                await component.mutateAsync({
                    isUpdated: "update",
                });
                setAddAmount("");
                setValue(null);
                Alert.alert("Success", "Pengeluaran berhasil diperbarui");
            }
            if (status === "delete") {
                if (!value) {
                    Alert.alert(
                        "Error",
                        "Pilih pengeluaran yang ingin diupdate"
                    );
                    return;
                }
                await component.mutateAsync({
                    isUpdated: "delete",
                });
                setValue(null);
                Alert.alert("Success", "Pengeluaran berhasil dihapus");
            }
            queryClient.invalidateQueries({
                queryKey: ["components"],
                exact: false,
            });
        } catch (error) {
            console.error("Error inserting data:", error);
            Alert.alert("Error", "Failed to insert data");
        }
    };

    return (
        <View style={background.container}>
            <View style={background.section}>
                {compDropdown?.length > 0 && (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            Update Pengeluaran
                        </Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={compDropdown || []}
                            setOpen={setOpen}
                            setValue={setValue}
                            searchable={true}
                        />
                        {showForm ? (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <TextInput
                                    id="amountUpdated"
                                    placeholder="tambahkan nominal"
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
                                <Button
                                    title="update"
                                    onPress={() => handleForm("update")}
                                />
                                <Button
                                    color={"red"}
                                    onPress={() => {
                                        setShowForm(false);
                                        setAddAmount("");
                                    }}
                                    title="Batal"
                                />
                            </View>
                        ) : (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <Button
                                    title="Tambahkan Nominal"
                                    onPress={() => setShowForm(!showForm)}
                                />
                                <Button
                                    title="Hapus"
                                    color={"red"}
                                    onPress={() => {
                                        handleForm("delete");
                                    }}
                                />
                            </View>
                        )}
                    </View>
                )}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Tambahkan Pengeluaran
                    </Text>
                    <TextInput
                        id="name"
                        placeholder="Nama pengeluaran"
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
                        placeholder="Nominal pengeluaran"
                        keyboardType="numeric"
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
                    <Button
                        title="Tambahkan Pengeluaran"
                        onPress={() => handleForm("create")}
                    />
                </View>
            </View>
        </View>
    );
}
