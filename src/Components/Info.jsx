import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Info = (props) => {
    const navigation = useNavigation();
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Info</Text>
        </View>
    );
};

export default Info;
