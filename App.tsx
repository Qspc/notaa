import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./component/home/page";
import BottomBar from "./component/bottomBar";

type RootStackParamList = {
    Home: undefined;
    Details: { itemId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomePage} />
                {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
            </Stack.Navigator>
            <BottomBar />
        </NavigationContainer>
    );
}
