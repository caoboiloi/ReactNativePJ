import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import UpcomingItem from "./UpcomingItem";
const Upcoming = (props) => {
    const { data, setdata } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sắp diễn ra</Text>
            <UpcomingItem completed={setdata} list={data} />
        </View>
    );
};

export default Upcoming;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        padding: 15,
        paddingTop: 0,
    },
    title: {
        paddingLeft: 10,
        color: "#D4D4D4",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 0,
        paddingBottom: 10,
    },
    item_container: {
        backgroundColor: "#171719",
    },
});
