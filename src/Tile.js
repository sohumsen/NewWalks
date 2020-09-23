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
      let waypoints=this.props.waypoints
      let queryParams=""

    fetch(
      "http://maps.googleapis.com/maps/api/staticmap?size=400x200&path=40.737102,-73.990318|40.749825,-73.987963|40.752946,-73.987384|40.755823,-73.986397&key=" +
        API_KEY +
        "&sensor=true"
    )
      .then((response) => response.blob())
      .then((images) => {
        let url = URL.createObjectURL(images);
        this.setState({
          image: (
            <Image
              source={{ uri: url }}
              style={{ width: 400, height: 200 }}
            />
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
