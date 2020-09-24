import React, { Component } from "react";
import { StyleSheet, View, Text, Modal, TouchableHighlight } from "react-native";
import SettingsForm from "./settingsForm";

class Settings extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View>
            <View style={styles.modalView}>
              <Text style={styles.title}>Enter RSS feeds for your news:</Text>
              <SettingsForm />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#0b7c66", margin: 10 }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Config</Text>
        </TouchableHighlight>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 50,
  },
  modalView: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#b3d6cf",
    alignItems: "center",
    borderRadius: 5,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#0b7c66",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#565656"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Settings;