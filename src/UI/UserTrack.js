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
  H4,
} from "native-base";
export default class FABExample extends Component {
  state = {
    firstTime: Date.now()/1000,

    curTime: "",
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: Math.floor(Date.now()/1000 - this.state.firstTime),
      });
    }, 1000);
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
            <Text>Distance: {this.props.distanceTravelled}</Text>
          </CardItem>
          <CardItem
            style={{ flex: 1 }}
            button
            onPress={() => alert("This is Card Body")}
          >
            <Text>
              Time: {this.state.curTime}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
