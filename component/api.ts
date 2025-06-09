import { useSQLiteContext } from "expo-sqlite";
import { BudgetProps, ComponentProps } from "./types";

export async function getAllComponents(): Promise<ComponentProps[]> {
    const database = useSQLiteContext();
    return await database.getAllAsync<ComponentProps>(
        "SELECT * FROM Components"
    );
}

export const getAllBudgets = async () => {
    const database = useSQLiteContext();
    return await database.getAllAsync<BudgetProps>("SELECT * FROM Budgets");
};
