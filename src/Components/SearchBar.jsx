import React, { useState, useRef } from "react";
import { SearchBar } from "react-native-elements";
import { View, Animated } from "react-native";

const SearchBarInput = () => {
    const [search, setSearch] = useState("");
    const [focus, setFocus] = useState(false);
    const updateSearch = (e) => {
        setSearch(e);
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
            onFocus={() => {}}
        >
            <SearchBar
                platform="ios"
                onChangeText={updateSearch}
                value={search}
                inputStyle={{
                    height: 10,
                    backgroundColor: "transparent",
                    color: "gray",
                }}
                showLoading={search ? true : false}
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
                    paddingStart: 15,
                    paddingEnd: 15,
                }}
                searchIcon={{ iconStyle: { fontSize: 25 } }}
                onFocus={() => {
                    setFocus(true);
                }}
                onBlur={() => {
                    setFocus(false);
                }}
            />
        </Animated.View>
    );
};

export default SearchBarInput;
