import React, { Component } from "react";
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
} from "react-native";
import { parse } from "fast-xml-parser";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {news: [] };
  }

  componentDidMount() {
    this.fetchFeed()
    .then((data) => {
      this.setState({
        news: data,
      })
    });
  }

  todayDayShort(date) {
    Date.shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Date.shortDays[date.getDay()];
  }

  todayMonthShort(date) {
    Date.shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return Date.shortMonths[date.getMonth()];
  }

  fetchFeed() {
    const test = fetch("https://www.theguardian.com/us/rss")
    .then(result => result.text())
    .then(data => {
      const feedData = parse(data);
      return feedData.rss.channel["item"]
      //return parse(data);
    }).then(function(d) {
      return d;
    })
  
    return test;
  }

  newsRssFeed() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const rssUrls = {
      // "Common Dreams": "https://www.commondreams.org/rss.xml",
      "The Guardian": "https://www.theguardian.com/us/rss",
      "National Review": "https://www.nationalreview.com/feed/",
      "Axios": "https://api.axios.com/feed/",
    };

    let today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const todayFormatted = `${this.todayDayShort(today)}, ${day} ${this.todayMonthShort(
      today
    )} ${year}`;
    const newsFeed = [];

    for (let newspaper in rssUrls) {
      fetch(rssUrls[newspaper])
        .then((response) => response.text())
        .then((response) => {
          let data = parse(response);
          let items = data.rss.channel["item"];

          items.forEach((el, key) => {
            const pubDateArray = el.pubDate.split(" ");
            if (
              `${pubDateArray[0]} ${pubDateArray[1]} ${pubDateArray[2]} ${pubDateArray[3]}` ===
              todayFormatted
            ) {
              newsFeed.push({
                'paper': newspaper,
                'pubDate': el.pubDate,
                'link': el.link,
                'title': el.title
              });
            }
          });
          //console.log(this.state);
          //return newsFeed;
          // return newsFeed.map(function(news, i) {
          //   return (
          //     <View key={i}>
          //       <Text>{news}</Text>
          //     </View>
          //   )
          // })
        })
        .catch((err) => {
          console.log("fetch", err);
        });
    }

  }

  render() {
    //console.log(this.fetchFeed()); // Just shows Promise.
    const feed = this.state.news;
    //console.log(feed);

    let today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const todayFormatted = `${this.todayDayShort(today)}, ${day} ${this.todayMonthShort(
      today
    )} ${year}`;

    let newsItems = [];
    feed.forEach((el, key) => {
      const pubDateArray = el.pubDate.split(" ");
      if (
        `${pubDateArray[0]} ${pubDateArray[1]} ${pubDateArray[2]} ${pubDateArray[3]}` ===
        todayFormatted
      ) {
        newsItems.push({
          // 'paper': newspaper,
          'pubDate': el.pubDate,
          'link': el.link,
          'title': el.title
        });
      }
    });
    console.log(newsItems)

    return newsItems.map(function(item, i) {
      return (
        <View key={i}>
          <Text>-----------</Text>
          <Text>{item.pubDate}</Text>
          <Text>{item.link}</Text>
          <Text>{item.title}</Text>
        </View>
      )
    })
    // return (
    //   <SafeAreaView>
    //     {this.newsRssFeed()}
    //   </SafeAreaView>
    // );
  }
}

export default News;