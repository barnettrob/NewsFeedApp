import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";

import News from "./components/rss";
import Header from "./components/header";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <Header />
          <ScrollView>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 5,
  }
});
