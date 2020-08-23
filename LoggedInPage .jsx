import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Button,
} from "react-native";

const LoggedInPage = (props) => {
    return props.photoUrl ? (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome:{props.name}</Text>
            <Image style={styles.image} source={{ uri: props.photoUrl }} />
            <Button title="logout" onPress={() => props.logOut("")} />
        </View>
    ) : (
        <ActivityIndicator />
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 25,
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150,
    },
});
export default LoggedInPage;
