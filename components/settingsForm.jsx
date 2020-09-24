import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

class SettingsForm extends Component {

  render() {
    let rssInputArray = [];
    for (let i = 0; i < 6; i++) {
      rssInputArray.push(<TextInput
        key={i}
        style={styles.input}
        placeholder="RSS Feed"
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