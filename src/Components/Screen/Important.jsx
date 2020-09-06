import React from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import UpcomingItem from "../UpcomingItem";
import { useSelector } from "react-redux";

const Important = () => {
    const notes = useSelector((state) => state);
    return (
        <View style={styles.container}>
            <UpcomingItem completed={null} list={notes} type={"Important"} />
        </View>
    );
};

export default Important;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
});
