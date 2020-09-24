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
        <Button style={{ backgroundColor: "#34A34F" }} onPress={()=>this.props.saveMap()}>
          <Icon name="save" />
        </Button>
        <Button onPress={()=>this.props.getChosenNearbyPlaces()}>
          <Icon name="create" />
        </Button>
      </View>
    );
  }
}
