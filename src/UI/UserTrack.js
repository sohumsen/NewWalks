import React, { Component } from "react";

import {
  Container,
  Header,
  View,
  Button,
  Icon,
  Fab,
  Card,
  CardItem,
  Body,
  H4,
} from "native-base";

import {Text} from 'react-native'
export default class FABExample extends Component {
  state = {
    firstTime: Date.now() / 1000,

    curTime: "",
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: Math.floor(Date.now() / 1000 - this.state.firstTime),
      });
    }, 1000);
  }
  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Text>Distance: {this.props.distanceTravelled}</Text>
          </CardItem>
          <CardItem>
            <Text>Time: {this.state.curTime}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
