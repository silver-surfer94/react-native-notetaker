import React, { Component } from "react";
import { View, WebView, StyleSheet } from "react-native";
import propTypes from "prop-types";

export default class Web extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.props.url }} />
      </View>
    );
  }
}

Web.propTypes = {
  url: propTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EF",
    flexDirection: "column"
  }
});
