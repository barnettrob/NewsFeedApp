import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rssFeeds: {}
    }
  }

  render() {
    let rssInputArray = [];
    for (let i = 0; i < 5; i++) {
      rssInputArray.push(<TextInput
        key={i}
        style={styles.input}
        placeholder="RSS Feed"
        ref={i}
        onEndEditing={(e) => {
          if (i < 4 && e.nativeEvent.text !== '' && e.nativeEvent !== 'undefined') {
            this.state.rssFeeds['rss' + i] = e.nativeEvent.text
          }
        }}
        onChangeText={(text) => {
          if (i === 4) {
            this.state.rssFeeds['rss' + i] = text;
          }
        }}
      />);
    }

    return (
      <View>
        {rssInputArray}
        {/* Take a look at https://react-hook-form.com/ */}
        <Button
          title="Save"
          onPress={() =>{
            console.log(this.state);
          }}
        />
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