import * as React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Dimensions,
} from "react-native";
import CardList from "./CardList";
import SearchBarInput from "./SearchBar";
import Upcoming from "./Upcoming";
import IconAdd from "react-native-vector-icons/Ionicons";
import AddEditToDo from "./Modal/AddEditToDo";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
function Home(props) {
    const navigation = useNavigation();
    const [data, setdata] = React.useState([]);
    const [isAddVisible, setAddVisible] = React.useState(false);

    const notes = useSelector((state) => state);

    React.useEffect(() => {
        setdata(notes);
    }, [notes]);

    return (
        <View style={styles.centeredView}>
            <SearchBarInput />
            <ScrollView>
                <CardList data={data} />
                <Upcoming data={data} setdata={setdata} />
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => setAddVisible(true)}>
                <View style={styles.addView}>
                    <IconAdd
                        name="ios-add-circle-outline"
                        size={30}
                        color="#136CDE"
                    />
                    <Text style={styles.textAdd}>Lời nhắc mới</Text>
                </View>
            </TouchableWithoutFeedback>
            <AddEditToDo
                isAddVisible={isAddVisible}
                setAddVisible={setAddVisible}
            />
            <Button
                title="asd"
                onPress={() => navigation.navigate("AllList")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        backgroundColor: "rgba(0,0,0,1)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    TextAdd: {
        padding: 10,
        color: "white",
    },
    addView: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 5,
        left: 0,
        bottom: 0,
    },
    textAdd: {
        color: "#136CDE",
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 10,
    },
});

Home.propTypes = {};

export default Home;
