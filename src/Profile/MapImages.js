import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
} from "native-base";
import MapImage from "./MapImage";
export default class CardImageExample extends Component {
  render() {
    return (
        <Content>
        <List>
            <MapImage/>
            <MapImage/>

          </List>
        </Content>
    );
  }
}
