import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Card,
  CardItem,
  Icon,
} from "native-base";
import MapView, { PROVIDER_GOOGLE, UrlTile } from "react-native-maps";
import Tile from "./Tile";

export default class CardImageExample extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri:
                  "https://www.nationalgeographic.com/content/dam/ngdotcom/rights-exempt/maps/world-classic-2018-banner-clip-72.adapt.1900.1.jpg",
              }}
            />
            <Body>
              <Text>{Object.keys(this.props.mapObj)[0]}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Tile mapObj={this.props.mapObj} />
        </CardItem>
        <CardItem>
          <Left>
            <Button
              transparent
              onPress={() =>
                this.props.removeData(Object.keys(this.props.mapObj)[0])
              }
            >
              <Icon name="trash" />
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Text>
                {this.props.mapObj[Object.keys(this.props.mapObj)[0]][
                  "chosenNearbyPlaces"
                ]
                  .map((place) => place.name)
                  .join("->")}
              </Text>
            </Button>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.replayMap(Object.keys(this.props.mapObj)[0])
              }
            >
              <Icon name="redo" style={{ color: "blue" }} />
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
