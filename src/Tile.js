import { View, Text } from "native-base";
import { Image } from "react-native";
import API_KEY from "../API_KEY";
import React, { Component } from "react";
export default class Tile extends Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.getImagePath();
  }

  getImagePath = () => {
    let waypoints = this.props.mapObj; // [{lat:"",long:""}]
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");

    console.log(
      this.props.mapObj[Object.keys(this.props.mapObj)[0]].chosenNearbyPlaces
    );
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");

    let waypointsStr = this.props.mapObj[
      Object.keys(this.props.mapObj)[0]
    ].chosenNearbyPlaces
      .map((waypoint) => waypoint.lat + "," + waypoint.lng)
      .join("|");
    console.log(waypointsStr);

    let queryParams =
      "&path=" + waypointsStr + "&key=" + API_KEY + "&sensor=true";

    fetch(
      "http://maps.googleapis.com/maps/api/staticmap?size=400x200"+queryParams
    )
      .then((response) => response.blob())
      .then((images) => {
        let url = URL.createObjectURL(images);
        this.setState({
          image: (
            <Image source={{ uri: url }} style={{ width: 400, height: 200 }} />
          ),
        });
      })

      .catch((err) => {
        console.log("err" + err);
      });
  };

  render() {
    return <View>{this.state.image}</View>;
  }
}
