import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CardList = (props) => {
    const { data } = props;
    const numberCompleted = data.filter((e) => e.completed === true).length;
    const numberImportant = data.filter(
        (e) => e.important === true && e.completed === false
    ).length;
    const numberToday = data.filter((x) => {
        const now = new Date();
        if (
            now.getDate() === new Date(x.time).getDate() &&
            now.getMonth() === new Date(x.time).getMonth() &&
            now.getYear() === new Date(x.time).getYear()
        ) {
            return true;
        }
        return false;
    }).length;
    const numberAll = data.filter((e) => e.completed !== true).length;
    return (
        <View style={styles.container}>
            <CardItem
                iconName="calendar-alt"
                title="Hôm nay"
                color="#0372E5"
                number={numberToday}
                name="Today"
            />
            <CardItem
                iconName="check-double"
                title="Đã hoàn thành"
                color="green"
                number={numberCompleted}
                name="Completed"
            />
            <CardItem
                iconName="wallet"
                title="Tất cả"
                color="#4F5259"
                number={numberAll}
                name="AllList"
            />
            <CardItem
                iconName="info"
                title="Quan trọng"
                color="#DC830E"
                number={numberImportant}
                name="Important"
            />
        </View>
    );
};
const CardItem = (props) => {
    const navigation = useNavigation();
    const { iconName, title, color, number, name } = props;
    return (
        <TouchableOpacity
            onPress={() => (name ? navigation.navigate(name) : {})}
        >
            <View
                style={{
                    ...styles.item,
                    backgroundColor: "#18181A",
                }}
            >
                <View style={styles.header}>
                    <View style={{ ...styles.icon, backgroundColor: color }}>
                        <Icon name={iconName} size={15} color={"white"} />
                    </View>
                    <Text
                        h3
                        h3Style={{
                            color: "white",
                            fontWeight: "bold",
                            textAlignVertical: "top",
                            textAlign: "center",
                        }}
                    >
                        {number}
                    </Text>
                </View>
                <View style={styles.title}>
                    <Text
                        h5
                        style={{
                            color: "#88878C",
                            fontSize: 20,
                            fontWeight: "bold",
                        }}
                    >
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CardList;
const maxWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        width: maxWidth,
        paddingRight: 15,
        paddingLeft: 15,
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
    },
    item: {
        height: 95,
        width: (maxWidth - 30 - 15) / 2,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        paddingTop: 10,
        flexWrap: "wrap",
        borderRadius: 10,
    },
    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "50%",
    },
    title: {
        position: "absolute",
        bottom: 15,
        left: 15,
    },
});
