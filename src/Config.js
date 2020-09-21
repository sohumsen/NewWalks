import { Container } from "native-base";
import React, { Component } from "react";
import { Button, TextInput, StyleSheet, View } from "react-native";

export default class Config extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          keyboardType="numeric"
          onChangeText={(text) => this.props.handleRadiusDistanceChange(text)}
          value={this.props.radiusDistance}
          placeholder="Enter distance (m)"
        />
        <Button
          style={styles.button}
          title="Submit"
          onPress={() => this.props.getNearbyPlaces()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  textBox: {
    flexGrow: 1,
  },
  button: {
    flexGrow: 1,
  },
});
