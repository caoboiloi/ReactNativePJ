import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";

const CancelModal = (props) => {
    const { isCancelVisible, setCancelVisible, accept } = props;
    return (
        <View>
            <Modal isVisible={isCancelVisible} backdropOpacity={0.5}>
                <View style={styles.modal}>
                    <View style={{ ...styles.button }}>
                        <Button
                            color="#F74539"
                            title="Hủy bỏ thay đổi"
                            onPress={async () => {
                                await setCancelVisible(false);
                                accept(false);
                            }}
                        />
                    </View>
                    <View style={{ ...styles.button, marginBottom: 0 }}>
                        <Button
                            title="Hủy"
                            onPress={() => setCancelVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CancelModal;

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        backgroundColor: "#171719",
        width: "100%",
        padding: 10,
        borderRadius: 10,
    },
    modal: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        position: "absolute",
        width: "100%",
    },
});
