import * as React from "react";
import { Text, View, SafeAreaView, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
function Setting(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: "#ecf0f1" }]}
        >
            <Text>Setting</Text>
            <Button title="Home" onPress={() => navigation.pop()} />
        </SafeAreaView>
    );
}

Setting.propTypes = {};
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default Setting;
