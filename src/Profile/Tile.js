import { View, Text } from "native-base";
import { Image } from "react-native";
import GOOGLE_API_KEY from "../../GOOGLE_API_KEY";
import React, { Component } from "react";
export default class Tile extends Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.getImagePath();
  }

  getImagePath = () => {
    let queryParams =
      "&path=enc:" +
      this.props.mapObj[Object.keys(this.props.mapObj)[0]].waypointsRoute
        .encodedPoints +
      "&key=" +
      GOOGLE_API_KEY +
      "&sensor=true";

    let url =
      "http://maps.googleapis.com/maps/api/staticmap?size=400x200" +
      queryParams;

    fetch(url)
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
