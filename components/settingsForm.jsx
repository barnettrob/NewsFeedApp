import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rssFeeds: {},
      feedsStorage: {},
    };
  }

  componentDidMount() {
    const feeds = this.getFeedData().then((result) => {
      if (result !== null) {
        this.setState({ feedsStorage: result });
      }
    });
  }

  is_url(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  saveFeedData = async (rssFeeds) => {
    try {
      const jsonValue = JSON.stringify(rssFeeds);
      await AsyncStorage.setItem("rssFeeds", jsonValue);
      alert("Feeds Saved!")
    } catch (e) {
      alert("There was a problem saving your RSS Feeds");
    }
  };

  getFeedData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("rssFeeds");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  render() {
    let rssInputArray = [];
    for (let i = 0; i < 5; i++) {
      let key =
        typeof Object.keys(this.state.feedsStorage)[i] === "undefined"
          ? 0
          : Object.keys(this.state.feedsStorage)[i];
      rssInputArray.push(
        <TextInput
          key={i}
          style={styles.input}
          placeholder="RSS Feed"
          ref={(input) => {
            this.i = input;
          }}
          defaultValue={this.state.feedsStorage[key]}
          onEndEditing={(e) => {
            if (
              i < 4 &&
              e.nativeEvent.text !== "" &&
              e.nativeEvent !== "undefined"
            ) {
              if (this.is_url(e.nativeEvent.text)) {
                this.state.rssFeeds[i] = e.nativeEvent.text;
              } else {
                alert("Invalid url");
                this.i.clear();
              }
            }
          }}
          onChangeText={(text) => {
            if (i === 4) {
              if (this.is_url(text)) {
                this.state.rssFeeds[i] = text;
              }
            }
          }}
        />
      );
    }

    return (
      <View>
        {rssInputArray}
        {/* Take a look at https://react-hook-form.com/ */}
        <Button
          title="Save"
          onPress={() => {
            const rssFeeds = this.state.rssFeeds;
            this.saveFeedData(rssFeeds);
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
    marginBottom: 5,
  },
});

export default SettingsForm;
