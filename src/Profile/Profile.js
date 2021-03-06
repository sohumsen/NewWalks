import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Title,
  Toast,
} from "native-base";
import MapImages from "./MapImages";
import { AsyncStorage, Dimensions, View } from "react-native";
export default class Profile extends Component {
  state = {
    showNavigate: false,
    mapData: null,
    sortBy: "distance",
  };
  componentDidMount() {
    this.importData();
  }
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      let data = result.map((req) => {
        return { [req[0]]: JSON.parse(req[1]) };
      });
      this.setState({ mapData: data });
    } catch (error) {
      Toast.show({
        text: "Oops, something went wrong",
        buttonText: "Okay",
        type: "danger",
      });
      
    }
  };

  removeMap = async (key) => {
    try {
      const value = await AsyncStorage.removeItem(key);
      let mapData = [...this.state.mapData];
      let idx = mapData.findIndex((e) => {
        return Object.keys(e)[0] === key;
      });
      mapData.splice(idx, 1);

      // let mapData=this.state.mapData.filter(mapObj=>mapObj.)
      // delete this.state.mapData[key]
      this.setState({ mapData: mapData });
      if (value !== null) {
        // We have data!!
      }
    } catch (error) {
      Toast.show({
        text: "Oops, something went wrong",
        buttonText: "Okay",
        type: "danger",
      });
      // Error retrieving data
    }
  };
  replayMap = (key) => {
    let mapData = [...this.state.mapData];
    let idx = mapData.findIndex((e) => {
      return Object.keys(e)[0] === key;
    });

    this.props.setNewMap(mapData[idx][key]);
  };

  // sortMapList = (sortBy) => {
  //   let mapData = [...this.state.mapData];
  //   let sortedMapData = [];

  //   if (sortBy === "distance") {
  //     sortedMapData = mapData.sort((a, b) => {
  //       if (
  //         parseFloat(
  //           b.waypointsRoute.routeDistance[
  //             b.waypointsRoute.routeDistance.substring(
  //               0,
  //               b.waypointsRoute.routeDistance.indexOf(" ")
  //             )
  //           ]
  //         ) -
  //           parseFloat(
  //             b.waypointsRoute.routeDistance[
  //               b.waypointsRoute.routeDistance.substring(
  //                 0,
  //                 b.waypointsRoute.routeDistance.indexOf(" ")
  //               )
  //             ]
  //           ) >
  //         0
  //       )
  //     });
  //   } else if (sortBy === "time") {
  //     sortedMapData = mapData.sort(
  //       (a, b) =>
  //         b.waypointsRoute.routeDuration - a.waypointsRoute.routeDuration
  //     );
  //   } else if (sortBy === "radius") {
  //     sortedMapData = mapData.sort(
  //       (a, b) => b.isoline.radiusMagnitude - a.isoline.radiusMagnitude
  //     );
  //   } else if (sortBy === "transport") {
  //     sortedMapData = mapData.sort(
  //       (a, b) => b.isoline.transportMode - a.isoline.transportMode
  //     );
  //   } else if (sortBy === "rangeType") {
  //     sortedMapData = mapData.sort(
  //       (a, b) => b.isoline.rangeType - a.isoline.rangeType
  //     );
  //   } else if (sortBy === "date") {
  //     sortedMapData = mapData.sort(
  //       (a, b) => b.isoline.rangeType - a.isoline.rangeType
  //     );
  //   }

  // };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#F5FCFF",

          // height: Dimensions.get("window").height - 140,
        }}
      >
      
          {this.state.mapData !== null ? (
            <MapImages
              mapData={this.state.mapData}
              removeData={this.removeMap}
              replayMap={this.replayMap}
            />
          ) : null}

      
      </View>
    );
  }
}
