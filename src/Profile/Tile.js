import { View, Text, Toast } from "native-base";
import { Image } from "react-native";
import SOHUM_API_KEY from "../../API_KEYS/SOHUM_API_KEY";
import UNIVARZ_API_KEY from "../../API_KEYS/UNIVARZ_API_KEY";

import React, { Component } from "react";
export default class Tile extends Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.getImagePath();
  }

  getImagePath = () => {
    let API_CHOICE = Math.floor(Math.random() * 2)
      ? SOHUM_API_KEY
      : UNIVARZ_API_KEY;

    let queryParams =
      "&path=enc:" +
      this.props.mapObj[Object.keys(this.props.mapObj)[0]].waypointsRoute
        .encodedPoints +
      "&key=" +
      API_CHOICE +
      "&sensor=true";

    let url =
      "http://maps.googleapis.com/maps/api/staticmap?size=250x200" +
      queryParams;

    fetch(url)
      .then((response) => response.blob())
      .then((images) => {
        let url = URL.createObjectURL(images);

        this.setState({
          image: (
            <Image
              source={{
                uri: url,
              }}
              style={{ width: 250, height: 200, borderRadius:20 }}
            />
          ),
        });
      })

      .catch((err) => {
        Toast.show({
          text: "Oops, something went wrong",
          buttonText: "Okay",
          type: "danger",
        });
      });
  };

  render() {
    return <View>{this.state.image}</View>;
  }
}
