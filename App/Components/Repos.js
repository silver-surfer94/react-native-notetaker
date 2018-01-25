import React, { Component } from "react";
import PropTypes from "prop-types";

import Badge from "./Badge";
import Separator from "./Helpers/Separator";
import WebView from "./Helpers/WebView";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";

export default class Repos extends Component {
  constructor(props) {
    super(props);
  }

  openPage(url) {
    this.props.navigator.push({
      component: WebView,
      title: "Web View",
      passProps: { url }
    });
  }

  render() {
    const { repos } = this.props;
    const list = repos.map((item, index) => {
      const desc = repos[index].description ? (
        <Text style={styles.description}>{repos[index].description}</Text>
      ) : (
        <View />
      );
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={() => this.openPage(repos[index].html_url)}
              underlayColor="transparent"
            >
              <Text style={styles.name}>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>
              {" "}
              Starts: {repos[index].stargazers_count}
            </Text>
            {desc}
          </View>
        </View>
      );
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}

Repos.propTypes = {
  userInfo: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 10
  },
  name: {
    color: "#48BBEC",
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: "#48BBEC",
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});
