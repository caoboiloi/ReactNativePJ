import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import IconCancle from "react-native-vector-icons/Feather";
import StarIcon from "react-native-vector-icons/AntDesign";
import AddEditToDo from "./Modal/AddEditToDo";
import { editnote, deletenote } from "./Redux/noteApp";
import { useDispatch } from "react-redux";
let dataTemp = [];

const UpcomingItem = (props) => {
    const { list, completed } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const dispatch = useDispatch();
    const editNote = (note) => dispatch(editnote(note));
    const [data, setdata] = useState([]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            {list.map((item, i) => {
                if (item.completed) {
                    return;
                }
                const borderRadiusTop = i == 0 ? true : false;
                const borderRadiusBottom = i == list.length - 1 ? true : false;

                return (
                    <ListItem
                        onPress={() => {
                            setAddVisible(true);
                            setdata(item);
                        }}
                        onLongPress={() => {
                            let newList = Array.from([...Object.create(list)]);
                            const newItem = newList.find(
                                (element) => element.time === item.time
                            );
                            const newTempItem = { ...newItem };
                            const index = newList.indexOf(newItem);
                            newList.splice(index, 1);
                            newTempItem.completed = true;
                            newList.splice(index, 0, newTempItem);
                            dataTemp = [...newList];
                            toggleModal();
                        }}
                        containerStyle={{
                            ...styles.item_container,
                            borderTopLeftRadius: borderRadiusTop ? 15 : 0,
                            borderTopRightRadius: borderRadiusTop ? 15 : 0,
                            borderBottomLeftRadius: borderRadiusBottom ? 15 : 0,
                            borderBottomRightRadius: borderRadiusBottom
                                ? 15
                                : 0,
                        }}
                        titleStyle={{ color: "#88878C" }}
                        key={i}
                        title={item.title}
                        bottomDivider={borderRadiusBottom ? false : true}
                        leftIcon={
                            <StarIcon
                                name={item.important ? "star" : "staro"}
                                size={30}
                                color="orange"
                            />
                        }
                        chevron
                    />
                );
            })}
            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={["left", "right"]}
                swipeThreshold={250}
                animationIn="fadeInRight"
            >
                <View style={styles.itemModal}>
                    <View style={styles.modalContainer}>
                        <IconCancle
                            name="x-circle"
                            size={30}
                            color="white"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                    <Text
                        style={{
                            ...styles.title,
                            paddingBottom: 10,
                            marginTop: 15,
                        }}
                    >
                        Xác nhận hoàn thành
                    </Text>
                    <Icon
                        name="ios-checkmark-circle-outline"
                        size={70}
                        color="green"
                        onPress={() => {
                            setModalVisible(false);
                            if (dataTemp != []) {
                                editNote(dataTemp);

                                dataTemp = [];
                            }
                        }}
                        style={styles.icon}
                    />
                </View>
            </Modal>
            <AddEditToDo
                isAddVisible={isAddVisible}
                setAddVisible={setAddVisible}
                data={data}
            />
        </View>
    );
};

export default UpcomingItem;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        padding: 25,
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
    itemModal: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#171719",
        height: "30%",
        borderRadius: 10,
    },
    modalContainer: {
        top: 10,
        right: 10,
        alignSelf: "flex-end",
        position: "absolute",
    },
    icon: {
        bottom: 0,
        alignSelf: "center",
    },
});
