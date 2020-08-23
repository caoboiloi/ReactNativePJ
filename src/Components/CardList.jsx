import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

const CardList = (props) => {
    const { data } = props;
    const numberCompleted = data.filter((e) => e.completed === true).length;
    const numberImportant = data.filter((e) => e.important === true).length;
    return (
        <View style={styles.container}>
            <CardItem
                iconName="calendar-alt"
                title="Hôm nay"
                color="#0372E5"
                number={1}
            />
            <CardItem
                iconName="check-double"
                title="Đã hoàn thành"
                color="green"
                number={numberCompleted}
            />
            <CardItem
                iconName="wallet"
                title="Tất cả"
                color="#4F5259"
                number={1}
            />
            <CardItem
                iconName="info"
                title="Quan trọng"
                color="#DC830E"
                number={numberImportant}
            />
        </View>
    );
};
const CardItem = (props) => {
    const { iconName, title, color, number } = props;
    const [bgColor, setBgColor] = useState(false);
    return (
        <View
            style={styles.item}
            onTouchStart={() => setBgColor(!bgColor)}
            style={{
                ...styles.item,
                backgroundColor: bgColor ? "#2A292E" : "#18181A",
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
