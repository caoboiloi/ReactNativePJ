import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Components/Home";
import Setting from "./src/Components/Setting";
import store from "./src/Components/Redux/store";
import { Provider as StoreProvider } from "react-redux";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <StoreProvider store={store}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Danh sách",
                        headerStyle: {
                            height: 0,
                        },
                    }}
                />
                <Stack.Screen name="Setting" component={Setting} />
            </Stack.Navigator>
        </StoreProvider>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
