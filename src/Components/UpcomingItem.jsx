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
import { cos } from "react-native-reanimated";
let dataTemp = [];
let isNewDate = false;

const UpcomingItem = (props) => {
    const { list, completed, type } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddVisible, setAddVisible] = useState(false);
    const dispatch = useDispatch();
    const editNote = (note) => dispatch(editnote(note));
    const [data, setdata] = useState([]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    let time = [];
    const newList =
        type === "showPart"
            ? list
                  .sort(function (a, b) {
                      return b.time - a.time;
                  })
                  .slice(0, 5)
            : list.sort(function (a, b) {
                  return b.time - a.time;
              });
    return (
        <View>
            {newList.map((item, i) => {
                if (item.completed) {
                    return;
                }
                let borderRadiusTop = i == 0 ? true : false;
                let borderRadiusBottom = i == newList.length - 1 ? true : false;
                const date = new Date(item.time).getDate();
                const month = new Date(item.time).getMonth();
                const year = new Date(item.time).getFullYear();
                const dateToString = date + "/" + month + "/" + year;
                if (!time.includes(dateToString)) {
                    time.push(dateToString);
                    isNewDate = true;
                    borderRadiusTop = true;
                } else {
                    isNewDate = false;
                }
                if (newList.includes(newList[i + 1])) {
                    if (
                        new Date(newList[i + 1].time).getDate() !==
                        new Date(newList[i].time).getDate()
                    ) {
                        borderRadiusBottom = true;
                    }
                }

                return (
                    <View key={i}>
                        {isNewDate ? (
                            <Text Text style={{ color: "white" }}>
                                {"Ngày " + date + "/" + month + "/" + year}
                            </Text>
                        ) : null}

                        <ListItem
                            onPress={() => {
                                setAddVisible(true);
                                setdata(item);
                            }}
                            onLongPress={() => {
                                let newList = Array.from([
                                    ...Object.create(list),
                                ]);
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
                                borderBottomLeftRadius: borderRadiusBottom
                                    ? 15
                                    : 0,
                                borderBottomRightRadius: borderRadiusBottom
                                    ? 15
                                    : 0,
                            }}
                            titleStyle={{ color: "white", fontSize: 18 }}
                            title={item.title}
                            subtitle={
                                item.note.length > 20
                                    ? item.note.slice(0, 20) + "..."
                                    : item.note
                            }
                            subtitleStyle={{ color: "#88878C" }}
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
                    </View>
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
