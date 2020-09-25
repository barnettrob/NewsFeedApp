import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

class SettingsForm extends Component {

  render() {
    let rssInputArray = [];
    let inputValues = {};
    for (let i = 0; i < 5; i++) {
      rssInputArray.push(<TextInput
        key={i}
        style={styles.input}
        placeholder="RSS Feed"
        ref={i}
        onEndEditing={(e) => {
          if (i < 4 && e.nativeEvent.text !== '' && e.nativeEvent !== 'undefined') {
            inputValues['rss' + i] = e.nativeEvent.text
            //console.log(inputValues);
          }
        }}
        onChangeText={(e) => {
          if (i === 4) {

          }
        }}
      />);
    }

    return (
      <View>
        {rssInputArray}
        {/* Take a look at https://react-hook-form.com/ */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    width: 350,
    marginBottom: 5
  }
});

export default SettingsForm;