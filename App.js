import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  SectionList,
  FlatList,
  ScrollView,
  StatusBar
} from "react-native";

import News from "./components/rss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true }
    //this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchTest()
    .then((data) => {
      this.setState({
        articles: data,
      })
    });
  }

  // fetchNews() {
  //   getNews()
  //   .then(articles => this.setState({ articles, refreshing: false }))
  //   .catch(() => this.setState({ refreshing: false }));
  // }

  // handleRefresh() {
  //   this.setState(
  //     {
  //       refreshing: true
  //     },
  //     () => this.fetchNews()
  //   );
  // }

  staticNews() {
    return [
      {
          paper: "The Guardian",
          pubDate: "Fri, 18 Sep 2020 08:00:20 GMT",
          title: "I was stressed but happy': weddings, Haitian style – a photo essa",
          link: "https://www.theguardian.com/world/2020/sep/18/i-was-stressed-but-happy-weddings-haitian-style-a-photo-essay"
  
  
      },
      {
          paper: "National Review",
          pubDate: "Fri, 18 Sep 2020 08:00:20 GMT",
          title: "The Rise of the Latino Republican",
          link: "https://www.nationalreview.com/2020/09/the-rise-of-the-latino-republican/"
      }
    ];
  }

  WholeNews() {
    const please = this.fetchDemo().then(function(result) {
      return result;
    });

    return this.staticNews().map(function(art, i) {
      // fetchDemo().then(function(result) {
      //   console.log(result)
      // })
      return (
        <View key={i}>
          <Text>{art.paper}</Text>
          <Text>{art.pubDate}</Text>
          <Text>{art.link}</Text>
          <Text>{art.title}</Text>
        </View>
      )
    })
  }


  fetchDemo() {
    return fetch("https://ghibliapi.herokuapp.com/people").then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
  } 

  fetchTest() {
    const test = fetch("https://www.theguardian.com/us/rss")
    .then(result => result.text())
    .then(data => {
      return data;
    }).then(function(d) {
      return d;
    })

    return test;
  }

  render() {
    //console.log(this.fetchTest());
    //console.log(this.state.articles);
    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView style={styles.scrollView}> */}
          <News />
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 5,
  },
  button: {
    marginTop: Platform.OS === "android" ? 20 : 10,
    borderRadius: 6,
  },
});
