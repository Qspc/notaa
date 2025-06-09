import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { BudgetProps, ComponentProps } from "../../component/types";
import React, { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { PieChart } from "react-native-chart-kit";
import {
    formatThreeDigit,
    generateRandomHexColor,
    sumAmount,
} from "../../component/helper";
import { getAllBudgets, getAllComponents } from "../../component/api";
import { useQuery } from "@tanstack/react-query";
import { background } from "../styles/style";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DividerVertical } from "../../component/ui/divider";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

export default function Tab() {
    const database = useSQLiteContext();
    const [chartData, setChartData] = useState<any[]>([]);

    const { data } = useQuery({
        queryKey: ["components"],
        queryFn: async () => {
            const res = await database.getAllAsync<ComponentProps>(
                "SELECT * FROM Components"
            );
            if (res.length > 0) {
                const total = sumAmount(res);
                setChartData(
                    res.map((item) => ({
                        name: item.name,
                        population: +(+item.amount / total).toFixed(2),
                        color: generateRandomHexColor(),
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 8,
                    }))
                );
            }
            return res;
        },
    });
    const { data: budget } = useQuery({
        queryKey: ["budget"],
        queryFn: async () => {
            return await database.getAllAsync<BudgetProps>(
                "SELECT * FROM Budgets"
            );
        },
    });

    return (
        <View style={background.container}>
            {data?.length === 0 ? (
                <View style={background.section}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 28,
                                textTransform: "uppercase",
                            }}
                        >
                            Nota App
                        </Text>
                        <Text
                            style={{
                                fontWeight: "normal",
                                fontSize: 12,
                            }}
                        >
                            Biar travelling kamu makin hemat!
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}
                    >
                        {/* <Text>Mulai manage pengeluaranmu disini</Text> */}
                        <Text
                            style={{
                                marginVertical: 60,
                                paddingVertical: 20,
                                fontWeight: "semibold",
                                borderColor: "#E0E0E0",
                                borderWidth: 1,
                                textAlign: "center",
                                fontSize: 24,
                                opacity: 0.6,
                            }}
                        >
                            Pengeluaran anda kosong
                        </Text>
                        {/* <Button
                        title="Tambahkan pengeluaran"
                        onPress={() => navigationRef.setParams({user:"Form"})}
                    /> */}
                    </View>
                </View>
            ) : (
                <View style={background.section}>
                    {chartData.length > 0 && (
                        <View style={{ height: 200, width: "100%" }}>
                            <PieChart
                                data={chartData}
                                width={300}
                                height={200}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                // center={[10, 50]}
                                absolute
                            />
                        </View>
                    )}
                    {budget?.length > 0 ? (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <Text>Budget kamu tersisa:</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                Rp
                                {formatThreeDigit(
                                    budget[0].amount - sumAmount(data)
                                )}{" "}
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    paddingVertical: 10,
                                    fontWeight: "semibold",
                                    borderColor: "#E0E0E0",
                                    borderWidth: 1,
                                    textAlign: "center",
                                    fontSize: 28,
                                    opacity: 0.6,
                                }}
                            >
                                Budget anda kosong
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}
