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
    console.log(this.props)
    return (
        <Content>
        <List>
          {this.props.mapData.map(mapObj=>{
            return <MapImage mapObj={mapObj} key={Object.keys(mapObj)[0]}/>
          })}
            

          </List>
        </Content>
    );
  }
}
