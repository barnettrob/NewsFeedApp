import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";

import News from "./components/rss";
import Header from "./components/header";
import { Restart } from "fiction-expo-restart";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  onRefresh(event) {
    this.setState({ refreshing: true });
    Restart();
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          <News />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 5,
  },
});
