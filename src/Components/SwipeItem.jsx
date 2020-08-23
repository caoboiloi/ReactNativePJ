import React, { useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

const rowTranslateAnimatedValues = {};
Array(3)
    .fill("")
    .forEach((_, i) => {
        rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

const SwipeItem = React.memo(function SwipeItem() {
    const [listData, setListData] = useState(
        Array(3)
            .fill("")
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );

    const onSwipeValueChange = (swipeData) => {
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width + 200) {
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 1,
                useNativeDriver: false,
            }).start(() => {
                const newData = [...listData];
                const prevIndex = listData.findIndex(
                    (item) => item.key === key
                );
                newData.splice(prevIndex, 1);
                setListData(newData);
            });
        }
    };

    const renderItem = (data) => {
        return (
            <Animated.View>
                <TouchableHighlight
                    onPress={() => {
                        console.log("You touchasded me");
                        console.log(data);
                    }}
                    style={styles.rowFront}
                    underlayColor={"#AAA"}
                >
                    <View>
                        <Text>I am {data.item.text} in a SwipeListView</Text>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        );
    };

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                disableRightSwipe
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={1000}
                onSwipeValueChange={onSwipeValueChange}
            />
        </View>
    );
});
export default SwipeItem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    backTextWhite: {
        color: "#FFF",
        textAlign: "right",
    },
    rowFront: {
        alignItems: "center",
        backgroundColor: "yellow",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        justifyContent: "center",
        height: 50,
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        right: 0,
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: "red",
        position: "absolute",
        width: "100%",
        right: 0,
        alignItems: "flex-end",
        paddingRight: 15,
    },
});
