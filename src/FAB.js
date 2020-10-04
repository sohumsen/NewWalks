import React, { Component } from "react";
import { Container, Header, View, Button, Icon, Fab, Text } from "native-base";
export default class FABExample extends Component {
  constructor() {
    super();
    this.state = {
      active: "true",
    };
  }
  render() {
    return (
      <View>
        <Button onPress={() => this.props.saveMap()}>
          <Icon name="save" />
        </Button>
        <Button
          style={{ backgroundColor: "red" }}
          onPress={() => this.props.getChosenNearbyPlaces()}
        >
          <Icon name="create" />
        </Button>
        <Button
          style={{ backgroundColor: "#34A34F" }}
          onPress={() => this.props.watchForLocationChanges()}
        >
          <Icon name="ios-arrow-dropright" />
        </Button>
      </View>
    );
  }
}
