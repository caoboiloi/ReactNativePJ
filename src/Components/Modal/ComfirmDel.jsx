import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Modal from "react-native-modal";

const ComfirmDel = (props) => {
    const {
        isDeleteVisible,
        setDeleteVisible,
        accept,
        time,
        closeModal,
    } = props;
    return (
        <View>
            <Modal isVisible={isDeleteVisible} backdropOpacity={0.8}>
                <View style={styles.modal}>
                    <View style={styles.text}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            Xóa "Nhắc nhở"
                            hjgajksdhgagsfbnasfnbasfjahsgfjasgfwefnbvsdfmhawekjfgksej?
                        </Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <View
                            style={{
                                ...styles.button,
                                borderRightWidth: 0.5,
                                borderColor: "gray",
                                borderBottomLeftRadius: 10,
                            }}
                        >
                            <Button
                                color="#F74539"
                                title="Xóa"
                                onPress={async () => {
                                    await setDeleteVisible(false);
                                    await closeModal(false);
                                    accept(time);
                                }}
                            />
                        </View>
                        <View
                            style={{
                                ...styles.button,
                                marginBottom: 0,
                                borderBottomRightRadius: 10,
                            }}
                        >
                            <Button
                                title="Hủy"
                                onPress={() => setDeleteVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ComfirmDel;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#171719",
        flex: 1,
        paddingBottom: 5,
    },
    modal: {
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "80%",
        backgroundColor: "#171719",
        padding: 10,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 10,
    },
    buttonGroup: {
        flexDirection: "row",
        borderTopWidth: 0.5,
        borderColor: "gray",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    text: { padding: 15, paddingBottom: 15 },
});
