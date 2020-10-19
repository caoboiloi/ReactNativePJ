import React from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import UpcomingItem from "../UpcomingItem";
import { useSelector } from "react-redux";

const Today = () => {
    const notes = useSelector((state) => state);
    const newNotes = notes.filter((x) => {
        const now = new Date();
        if (
            now.getDate() === new Date(x.time).getDate() &&
            now.getMonth() === new Date(x.time).getMonth() &&
            now.getYear() === new Date(x.time).getYear()
        ) {
            return true;
        }
        return false;
    });
    return (
        <View style={styles.container}>
            <UpcomingItem completed={null} list={newNotes} type={"Today"} />
        </View>
    );
};

export default Today;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
});
