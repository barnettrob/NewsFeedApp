import React, { Component } from "react";
import { StyleSheet, Linking, View, Text, Button } from "react-native";

class Header extends Component {
  render() {
    return (
      <View style={styles.navbar}>
        <View style={styles.containerLeft}>
          <Text style={styles.title}>News</Text>
        </View>
        <View style={styles.containerRight}>
          <Button
            style={styles.navConfig}
            color="#0b7c66"
            onPress={() => {
              Linking.openSettings();
            }}
            title="Config"
          >
            Config
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#47aa93",
    padding: 10,
    flexDirection: "row",
  },
  containerLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  containerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  navConfig: {},
});

export default Header;
