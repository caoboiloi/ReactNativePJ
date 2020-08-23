import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// import * as Google from "expo-google-app-auth";

// async function signInWithGoogleAsync() {
//     try {
//         const CliendID =
//             "62896161962-ko9jq6gdetci47hmilrasf04cg7ur4hm.apps.googleusercontent.com";

//         const result = await Google.logInAsync({
//             expoClientId: "react-native-4f187.firebaseapp.com",
//             iosClientId: CliendID,
//             iosStandaloneAppClientId: CliendID,
//             scopes: ["profile", "email"],
//         });
//         if (result.type === "success") {
//             return result.accessToken;
//         } else {
//             return { cancelled: true };
//         }
//     } catch (e) {
//         return { error: true };
//     }
// }
const Login = (props) => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button
                title="Sign in with Google"
                onPress={() => props.signIn()}
            />
        </View>
    );
};

export default Login;
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
