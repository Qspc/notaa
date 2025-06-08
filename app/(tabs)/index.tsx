import { View, Text, StyleSheet, Alert } from "react-native";
import { BudgetProps, ComponentProps } from "../../component/types";
import React, { useCallback, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { PieChart } from "react-native-chart-kit";
import {
    formatThreeDigit,
    generateRandomHexColor,
    sumAmount,
} from "../../component/helper";

const datatable = [
    {
        name: "Toronto",
        population: 2800000,
        color: generateRandomHexColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 8,
    },
    {
        name: "Beijing",
        population: 527612,
        color: generateRandomHexColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 8,
    },
    {
        name: "New York",
        population: 8538000,
        color: generateRandomHexColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 8,
    },
    {
        name: "Moscow",
        population: 11920000,
        color: generateRandomHexColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 8,
    },
];
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
    const [data, setData] = useState<ComponentProps[]>([]);
    const [budget, setBudget] = useState<BudgetProps[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const database = useSQLiteContext();

    const loadData = async () => {
        const result = await database.getAllAsync<ComponentProps>(
            "SELECT * FROM Components"
        );
        const res = await database.getAllAsync<BudgetProps>(
            "SELECT * FROM Budgets"
        );

        if (result.length > 0) {
            const total = sumAmount(result);
            setChartData(
                result.map((item) => ({
                    name: item.name,
                    population: +(+item.amount / total).toFixed(2),
                    color: generateRandomHexColor(),
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 8,
                }))
            );
        }

        setData(result || []);
        setBudget(res || []);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                height: "100%",
                padding: 10,
            }}
        >
            {chartData.length > 0 && (
                <View style={{ height: 400, width: "100%" }}>
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
            {/* {data ? (
                data?.map((item, index) => (
                    <Text key={index}>
                        {item.name} - {item.amount}
                    </Text>
                ))
            ) : (
                <Text>Notaa Apps</Text>
            )} */}
            {budget.length > 0 && (
                <Text>
                    Budget kamu tersisa: Rp
                    {formatThreeDigit(budget[0].amount - sumAmount(data))}{" "}
                </Text>
            )}
        </View>
    );
}
