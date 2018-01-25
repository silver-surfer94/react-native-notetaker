import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";

import Dashboard from "./Dashboard";
import api from "../utils/api";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLoading: false,
      error: false
    };
  }

  handleChange(text) {
    this.setState({ username: text });
  }

  handleSubmit() {
    this.setState({ isLoading: true });
    const { username } = this.state;
    api.getBio(username).then(res => {
      if (res.message === "Not Found") {
        this.setState({
          error: "User not found",
          isLoading: false
        });
      } else {
        this.props.navigator.push({
          title: res.name || "Select an option",
          component: Dashboard,
          passProps: { userInfo: res }
        });
        this.setState({
          isLoading: false,
          error: false,
          username: ""
        });
      }
    });
  }

  render() {
    const showErr = this.state.error ? (
      <Text>{this.state.error}</Text>
    ) : (
      <View />
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a GitHub user</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChangeText={text => this.handleChange(text)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSubmit()}
          underlayColor="white"
        >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#111"
          size="large"
        />
        {showErr}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#48BBEC"
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
    color: "#fff"
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    color: "white"
  },
  buttonText: {
    fontSize: 18,
    color: "#111",
    alignSelf: "center"
  },
  button: {
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});
