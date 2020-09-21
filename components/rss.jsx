import React, { Component } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Linking,
} from "react-native";
import { parse } from "fast-xml-parser";
// https://github.com/Paraboly/react-native-card
// Make sure to install the dependencies listed as well as npm install --save tslib
import { Card } from "@paraboly/react-native-card";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [] };
  }

  componentDidMount() {
    const rssUrls = {
      "The Guardian": "https://www.theguardian.com/us/rss",
      "National Review": "https://www.nationalreview.com/feed/",
      "Axios": "https://api.axios.com/feed/",
    };

    for (let newspaper in rssUrls) {
      this.fetchFeed(rssUrls[newspaper]).then((data) => {
        this.setState({
          news: data,
          newssource: newspaper,
        });
      });
    }
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

  fetchFeed(rss) {
    const url = fetch(rss)
      .then((result) => result.text())
      .then((data) => {
        const feedData = parse(data);
        return feedData.rss.channel["item"];
      })
      .then(function (d) {
        return d;
      });

    return url;
  }

  formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;

    return date.replace(pattern, replacement);
  }

  render() {
    const feed = this.state.news;
    const newssource = this.state.newssource;
    return (
      <FlatList
        data={feed}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          let today = new Date();
          const day = today.getDate();
          const year = today.getFullYear();
          const todayFormatted = `${this.todayDayShort(
            today
          )}, ${day} ${this.todayMonthShort(today)} ${year}`;
          const pubDateArray = item.pubDate.split(" ");
          const date = new Date(item.pubDate);
          const localDate = this.formatDate(date.toString());
          if (
            `${pubDateArray[0]} ${pubDateArray[1]} ${pubDateArray[2]} ${pubDateArray[3]}` ===
            todayFormatted
          ) {
            return (
              <Card
                style={styles.card}
                iconDisable
                title={item.title}
                content={localDate.replace(" GMT-0400 (EDT)", "")}
                topRightText={newssource}
                onPress={() => {
                  Linking.openURL(item.link);
                }}
              />
            );
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    margin: 15,
  },
});

export default News;
