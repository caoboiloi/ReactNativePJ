import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Switch,
    Button,
    Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import CancelModal from "./CancelModal";
import { Input } from "react-native-elements";
import IconStar from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { deletenote, addnote, editnote } from "../Redux/noteApp";
import ComfirmDel from "./ComfirmDel";
const screenWidth = Math.round(Dimensions.get("window").width);

const AddEditToDo = (props) => {
    const notes = useSelector((state) => state);
    const deleteNote = (id) => dispatch(deletenote(id));
    const addNote = (note) => dispatch(addnote(note));
    const editNote = (note) => dispatch(editnote(note));
    const dispatch = useDispatch();
    const { isAddVisible, setAddVisible, data } = props;
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [title, settitle] = useState("");
    const [time, setTime] = useState("");
    const [note, setnote] = useState("");
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const mode = data ? "edit" : "new";
    const [isNew, setisNew] = useState(false);
    const setData = () => {
        if (data) {
            settitle(data.title);
            setnote(data.note);
            setIsEnabled(data.important);
            setTime(data.time);
        }
    };
    useEffect(() => {
        const newData = {
            title: title,
            time: time,
            completed: false,
            important: isEnabled,
            note: note,
        };
        if (JSON.stringify(data) !== JSON.stringify(newData) && title !== "") {
            setisNew(true);
        } else {
            setisNew(false);
        }
    }, [isEnabled, title, note]);
    const titleInputChange = (e) => {
        settitle(e.nativeEvent.text);
    };
    const noteInputChange = (e) => {
        setnote(e.nativeEvent.text);
    };
    const handleAddNote = () => {
        data.title = title;
        data.time = time;
        data.important = isEnabled;
        data.note = note;
        setAddVisible(false);
        editNote([...notes]);
    };
    const handleNewNote = () => {
        if (title !== "") {
            const time = Date.now();
            const newData = {
                title: title,
                time: time,
                completed: false,
                important: isEnabled,
                note: note,
            };
            settitle("");
            setnote("");
            setIsEnabled(false);
            setTime("");
            addNote(newData);
            setAddVisible(false);
        }
    };
    useEffect(() => {
        if (data) {
            settitle(data.title);
            setnote(data.note);
            setIsEnabled(data.important);
            setTime(data.time);
        }
    }, [data]);
    return (
        <View>
            <Modal
                isVisible={isAddVisible}
                onSwipeComplete={() => {
                    setAddVisible(false);
                    setData();
                }}
                animationIn="fadeInRight"
                swipeDirection="down"
                swipeThreshold={250}
                style={styles.modal}
            >
                <View style={styles.item}>
                    <View style={styles.header}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss();
                                setAddVisible(false);
                                setData();
                            }}
                        >
                            <Text style={styles.colorText}>Hủy</Text>
                        </TouchableWithoutFeedback>
                        <Text
                            style={{
                                ...styles.colorText,
                                color: "white",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {mode === "edit"
                                ? "Chi tiết lời nhắc"
                                : "Lời nhắc mới"}
                        </Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss();
                                const handleFunction =
                                    mode == "new"
                                        ? handleNewNote
                                        : handleAddNote;
                                !isNew ? {} : handleFunction();
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.colorText,
                                    color: !isNew ? "gray" : "#136CDE",
                                }}
                            >
                                {mode === "edit" ? "Cập nhật" : "Thêm"}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.InputGroup}>
                        <View style={styles.WrapInput}>
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss}
                            >
                                <Input
                                    placeholder="Tiêu đề"
                                    errorStyle={{ color: "red" }}
                                    inputContainerStyle={{
                                        ...styles.input,
                                        borderBottomWidth: 0.3,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                    inputStyle={{ color: "white" }}
                                    placeholderTextColor="#676769"
                                    errorStyle={{ display: "none" }}
                                    onChange={titleInputChange}
                                    value={title}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.WrapInput}>
                            <TouchableWithoutFeedback
                                onPress={Keyboard.dismiss}
                            >
                                <Input
                                    placeholder="Ghi chú"
                                    errorStyle={{ color: "red" }}
                                    inputContainerStyle={{
                                        ...styles.input,
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}
                                    inputStyle={{ color: "white" }}
                                    placeholderTextColor="#676769"
                                    onChange={noteInputChange}
                                    value={note}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.switch}>
                            <View style={styles.switchLeft}>
                                <IconStar
                                    name="star-circle-outline"
                                    size={30}
                                    style={{ marginRight: 5 }}
                                    color="orange"
                                />
                                <Text style={styles.textSwitch}>Gắn sao</Text>
                            </View>
                            <Switch
                                trackColor={{
                                    false: "#444449",
                                    true: "#35CD56",
                                }}
                                thumbColor="white"
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        {mode === "edit" ? (
                            <Button
                                title="delete"
                                onPress={() => {
                                    setDeleteVisible(true);
                                }}
                            />
                        ) : (
                            <View></View>
                        )}
                    </View>
                </View>
                {/* <CancelModal
                    isCancelVisible={isCancelVisible}
                    setCancelVisible={setCancelVisible}
                    accept={setAddVisible}
                /> */}
                <ComfirmDel
                    isDeleteVisible={isDeleteVisible}
                    setDeleteVisible={setDeleteVisible}
                    accept={deleteNote}
                    time={time}
                    closeModal={setAddVisible}
                />
            </Modal>
        </View>
    );
};

export default AddEditToDo;

const styles = StyleSheet.create({
    colorText: {
        color: "#136CDE",
        fontSize: 18,
    },
    modal: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 0,
    },
    item: {
        backgroundColor: "#171719",
        alignContent: "center",
        alignItems: "center",
        width: screenWidth,
        padding: 15,
        height: "95%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    InputGroup: {
        marginTop: 20,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        width: "100%",
        backgroundColor: "#2B2B2D",
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderBottomWidth: 0,
    },
    WrapInput: {
        width: "100%",
        height: "auto",
    },
    switch: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#2B2B2D",
        borderRadius: 10,
    },
    textSwitch: {
        color: "white",
        fontSize: 15,
    },
    switchLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
