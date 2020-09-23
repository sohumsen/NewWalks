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
import Tile from '../Tile'

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
              {/* <Text>{this.props.dateTime}</Text>
              <Text note>{this.props.rating}</Text> */}
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>

          <Tile waypoints={this.props.waypoints}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Text>Date</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Text>Distance</Text>
            </Button>
          </Body>
          <Right>
            <Icon name="star" style={{ color: "yellow" }} />
          </Right>
        </CardItem>
      </Card>
    );
  }
}
