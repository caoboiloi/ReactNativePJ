import React from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import UpcomingItem from "../UpcomingItem";
import { useSelector } from "react-redux";

const AllList = () => {
    const notes = useSelector((state) => state);
    return (
        <View style={styles.container}>
            <UpcomingItem completed={null} list={notes} type={"showAll"} />
        </View>
    );
};

export default AllList;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
});
