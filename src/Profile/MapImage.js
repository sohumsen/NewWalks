import React, { Component } from "react";
import { Image, View } from "react-native";
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
    const date = Object.keys(this.props.mapObj)[0];
    const [first, second] = date.split(",");
    let second2 = second.replace(/\s/g, '');

    return (
      <Card>
        <CardItem
          style={{
            // borderRadius: 10,
            // borderColor: "blue",
            // borderWidth: 2,
          }}
        >
          <Tile mapObj={this.props.mapObj} />
          {/* <Thumbnail
              source={{
                uri:
                  "https://www.nationalgeographic.com/content/dam/ngdotcom/rights-exempt/maps/world-classic-2018-banner-clip-72.adapt.1900.1.jpg",
              }}
            /> */}

          <View
            style={{
              borderRadius: 10,
              borderColor: "blue",
              borderWidth: 1,
              height: "100%",
              padding:4,
              marginLeft:7
              // backgroundColor:"green"

            }}
          >
            <View
             
            >
              {this.props.mapObj[Object.keys(this.props.mapObj)[0]]["isoline"][
                "transportMode"
              ] === "pedestrian" ? (
                <Image
                  source={require("../../assets/walking_stickman.gif")}
                  style={{ width: "100%", height: 30 }}
                />
              ) : null}
              {this.props.mapObj[Object.keys(this.props.mapObj)[0]]["isoline"][
                "transportMode"
              ] === "car" ? (
                <Image
                  source={require("../../assets/car_driving.gif")}
                  style={{ width: "100%", height: 30 }}
                />
              ) : null}
              {this.props.mapObj[Object.keys(this.props.mapObj)[0]]["isoline"][
                "transportMode"
              ] === "truck" ? (
                <Image
                  source={require("../../assets/truck_driving.gif")}
                  style={{ width: "100%", height: 40 }}
                />
              ) : null}
            </View>

            <Text
              style={{
                fontSize: 15,
              }}
            >
              {
                this.props.mapObj[Object.keys(this.props.mapObj)[0]][
                  "waypointsRoute"
                ]["routeDuration"]
              }
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {
                this.props.mapObj[Object.keys(this.props.mapObj)[0]][
                  "waypointsRoute"
                ]["routeDistance"]
              }
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {first}
            </Text>
            <Text
              style={{
                fontSize: 15,
              }}
            >
              {second2}
            </Text>
            <Button
                  transparent
                  onPress={() =>
                    this.props.replayMap(Object.keys(this.props.mapObj)[0])
                  }
                >
                  <Icon name="redo" style={{ color: "blue" }} />
                </Button>
                <Button
                  transparent
                  onPress={() =>
                    this.props.removeData(Object.keys(this.props.mapObj)[0])
                  }
                >
                  <Icon name="trash" />
                </Button>
            {/* <CardItem>
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
                <Button
                  transparent
                  onPress={() =>
                    this.props.replayMap(Object.keys(this.props.mapObj)[0])
                  }
                >
                  <Icon name="redo" style={{ color: "blue" }} />
                </Button>
              </Body>
            </CardItem> */}
          </View>
        </CardItem>
      </Card>
    );
  }
}
