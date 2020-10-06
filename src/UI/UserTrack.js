import React, { Component } from "react";

import {
  Container,
  Header,
  View,
  Button,
  Icon,
  Fab,
  Text,
  Card,
  CardItem,
  Body,
  H1,
} from "native-base";
export default class FABExample extends Component {
  constructor() {
    super();
    this.state = {
      active: "true",
    };
  }
  render() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Card>
          <CardItem
            style={{ flex: 1 }}
            button
            onPress={() => alert("This is Card Header")}
          >
            <H1>Distance: {this.props.distanceTravelled}</H1>
          </CardItem>
          <CardItem
            style={{ flex: 1 }}
            button
            onPress={() => alert("This is Card Body")}
          >
            <Text>Time: {this.props.timeTaken}</Text>
          </CardItem>
          <Button style={{ position: "relative",right:0,width:20,height:20 }} onPress={() => this.props.saveMap()}>
            <Icon  name="pause" />
          </Button>
        </Card>
      </View>
    );
  }
}
