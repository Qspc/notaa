import { Stack } from "expo-router";
import { SQLiteProvider, SQLiteDatabase } from "expo-sqlite";

export default function Layout() {
    const createDbIfNeeded = async (db: SQLiteDatabase) => {
        await db.execAsync(
            "CREATE TABLE IF NOT EXISTS Components (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount INTEGER)"
        );
        await db.execAsync(
            "CREATE TABLE IF NOT EXISTS Budgets (id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER)"
        );
    };

    return (
        <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SQLiteProvider>
    );
}
