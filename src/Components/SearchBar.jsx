import React, { useState, useRef } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import { View, Animated, FlatList, StyleSheet, Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SearchBarInput = () => {
    const data1 = [
        {
            title: "1",
            time: 1,
            completed: false,
            important: true,
            note: "hallo1",
        },
        {
            title: "2",
            time: 2,
            completed: false,
            important: true,
            note: "hallo2",
        },
        {
            title: "3",
            time: 3,
            completed: true,
            note: "hallo3",
        },
        {
            title: "4",
            time: 4,
            completed: false,
            important: false,
            note: "hallo4",
        },
        {
            title: "5",
            time: 5,
            completed: false,
            important: true,
            note: "hallo5",
        },
        {
            title: "1236",
            time: 6,
            completed: false,
            important: false,
            note: "hallo6",
        },
    ];
    const [isModalFlatList, setModalFlatList] = useState(false);
    const [search, setSearch] = useState("");
    const [dataFilter, setdataFilter] = useState(data1);
    const [focus, setFocus] = useState(false);
    const searchFilterFunction = (text) => {
        setSearch(text);

        const newData = data1.filter((item) => {
            const itemData = `${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        setdataFilter(newData);
    };
    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "gray",
                }}
            />
        );
    };
    return (
        <Animated.View
            style={{
                width: "100%",
                backgroundColor: focus ? "#131313" : "#000000",
                paddingTop: 30,
                paddingBottom: focus ? 5 : 10,
                // backgroundColor: color,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SearchBar
                    platform="ios"
                    lightTheme
                    round
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    inputStyle={{
                        height: 10,
                        backgroundColor: "transparent",
                        color: "gray",
                    }}
                    placeholder="Tìm kiếm"
                    inputContainerStyle={{
                        backgroundColor: focus ? "#2A292E" : "#1C1C1E",
                        height: focus ? 40 : 30,
                        borderRadius: 10,
                        padding: 5,
                    }}
                    containerStyle={{
                        backgroundColor: "transparent",
                        borderTopWidth: 0,
                        borderColor: "gray",
                        paddingStart: 5,
                        paddingEnd: 10,
                    }}
                    searchIcon={{ iconStyle: { fontSize: 25 } }}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => {
                        Keyboard.dismiss();
                    }}
                />
            </TouchableWithoutFeedback>
            {focus && search !== "" ? (
                <FlatList
                    data={search === "" ? [] : dataFilter}
                    renderItem={({ item }) => (
                        <ListItem
                            chevron
                            bottomDivider={false}
                            onPress={() => {
                                console.log("pres11s");
                                setSearch("");
                            }}
                            title={`${item.title}`}
                            subtitle={item.note}
                            containerStyle={styles.flatListItem}
                            titleStyle={{ color: "white" }}
                            subtitleStyle={{ color: "white" }}
                        />
                    )}
                    keyExtractor={(item) => item.time + ""}
                    ItemSeparatorComponent={renderSeparator}
                />
            ) : null}
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    flatListItem: {
        borderBottomWidth: 0,
        borderBottomColor: "transparent",
        backgroundColor: "black",
    },
});
export default SearchBarInput;
