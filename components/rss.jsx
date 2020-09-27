import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  View,
  Text,
} from "react-native";
import { parse } from "fast-xml-parser";
import AsyncStorage from "@react-native-community/async-storage";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news1: [],
      news2: [],
      news3: [],
      news4: [],
      news5: [],
      savedFeeds: {},
    };
  }

  componentDidMount() {
    const feeds = this.getFeedData().then((result) => {
      if (result !== null) {
        this.setState({ savedFeeds: result });
        const rssFeeds = this.state.savedFeeds;
        for (let feed in rssFeeds) {
          this.fetchFeed(rssFeeds[feed]).then((data) => {
            if (rssFeeds[Object.keys(rssFeeds)[0]] == rssFeeds[feed]) {
              this.setState({
                news1: data,
              });
            } else if (rssFeeds[Object.keys(rssFeeds)[1]] == rssFeeds[feed]) {
              this.setState({
                news2: data,
              });
            } else if (rssFeeds[Object.keys(rssFeeds)[2]] == rssFeeds[feed]) {
              this.setState({
                news3: data,
              });
            } else if (rssFeeds[Object.keys(rssFeeds)[3]] == rssFeeds[feed]) {
              this.setState({
                news4: data,
              });
            } else if (rssFeeds[Object.keys(rssFeeds)[4]] == rssFeeds[feed]) {
              this.setState({
                news5: data,
              });
            }
          });
        }
      }
    });
  }

  getFeedData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("rssFeeds");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

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
    const feed1 = this.state.news1.slice(0, 10);
    const feed2 = this.state.news2.slice(0, 10);
    const feed3 = this.state.news3.slice(0, 10);
    const feedsCombined = [];
    feedsCombined.push(...feed1, ...feed2, ...feed3);

    let today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const todayFormatted = `${this.todayDayShort(
      today
    )}, ${day} ${this.todayMonthShort(today)} ${year}`;

    let newsItems = [];
    feedsCombined.forEach((el, key) => {
      const pubDateArray = el.pubDate.split(" ");

      if (
        `${pubDateArray[0]} ${pubDateArray[1]} ${pubDateArray[2]} ${pubDateArray[3]}` ===
        todayFormatted
      ) {
        const date = new Date(el.pubDate);
        const localDate = this.formatDate(date.toString());

        newsItems.push({
          pubDate: localDate.replace(" GMT-0400 (EDT)", ""),
          link: el.link,
          title: el.title,
        });
      }
    });

    return newsItems.map(function (item, i) {
      let url = item.link;
      url = url.replace("https://", "");
      url = url.split("/");
      const domain = url[0];

      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            Linking.openURL(item.link);
          }}
          key={i}
        >
          <View key={i} style={styles.card}>
            <Text style={styles.eyebrow}>{domain}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.pubDate}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
  },
  eyebrow: {
    marginBottom: 2,
    fontSize: 15,
    //backgroundColor: "#ef6969",
    borderRadius: 3,
    padding: 3,
    //color: '#fff'
  },
  title: {
    fontSize: 18,
  },
  date: {
    color: "#7f7f7f",
    marginTop: 5,
  },
});

export default News;
