import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";
import Home from "./src/Components/Home";
import store from "./src/Components/Redux/store";
import { Provider as StoreProvider } from "react-redux";
import SearchBarInput from "./src/Components/SearchBar";
import AllList from "./src/Components/Screen/AllList";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <StoreProvider store={store}>
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,

                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "black",
                        shadowRadius: 0,
                        shadowOffset: {
                            height: 0,
                        },
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        title: "Danh sách",
                    }}
                />
                <Stack.Screen
                    name="AllList"
                    component={AllList}
                    options={{
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
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
