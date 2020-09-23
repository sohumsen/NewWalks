import { Container } from "native-base";
import React, { Component } from "react";
import { Button, TextInput, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";

export default class Config extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Slider
          style={{ width: 200}}
          value={this.props.radiusDistance}
          onValueChange={(text) => this.props.handleRadiusDistanceChange(text)}
          minimumValue={0}
          maximumValue={3000}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        /> */}
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
