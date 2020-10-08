import React, { Component } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
  Polygon,
} from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { Card, CardItem, Icon, Input, Item } from "native-base";
import Config from "./Config";
import GOOGLE_MAPS_APIKEY from "../GOOGLE_API_KEY";
import Fab from "./FAB";
import { Container, Header } from "native-base";
import { AsyncStorage } from "react-native";
import UserTrack from "./UI/UserTrack";

class Map extends Component {
  // state = {
  //   waypointsRoute: "",
  //   routeDistance: "",
  //   routeDuration: "",
  // };

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.chosenNearbyPlaces !== prevProps.chosenNearbyPlaces) {
  //     this.getWaypointRoute();
  //     console.log("this.getWaypointRoute();");
  //   }
  // }


  // componentDidMount() {
  //   console.log("this.getWaypointRoute();");

  //   this.getWaypointRoute();
  // }
  render() {
    return (
      <View>
        {this.props.chosenNearbyPlaces !== null ? (
          <View>
            <MapView
              showsUserLocation
              followsUserLocation
              // onUserLocationChange={event => console.log(event.nativeEvent)}

              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              region={this.props.initialRegion}
            >
              {this.props.chosenNearbyPlaces.map((nearbyPlaces, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: nearbyPlaces.lat,
                    longitude: nearbyPlaces.lng,
                  }}
                  title={nearbyPlaces.name}
                />
              ))}
              <Polygon
                coordinates={this.props.isoline.decodedIsoline}
                strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={2}
                fillColor="rgba(45,87,250,0.08)"
              />
              {this.props.userTrack.routeCoordinates.length !== 0 ? (
                <Polyline
                  coordinates={this.props.userTrack.routeCoordinates}
                  strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeColors={["#B24112"]}
                  strokeWidth={3}
                  fillColor="green"
                />
              ) : null}
              {this.props.waypointsRoute.decodedPoints.length !== 0 ? (
                <Polyline
                  coordinates={this.props.waypointsRoute.decodedPoints}
                  strokeColors={["hotpink"]}
                  strokeWidth={3}
                />
              ) : null}
              {/* <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                mode={"WALKING"}
                strokeColor="hotpink"
                origin={{
                  latitude: this.props.initialRegion.latitude,
                  longitude: this.props.initialRegion.longitude,
                }}
                destination={{
                  latitude: this.props.initialRegion.latitude,
                  longitude: this.props.initialRegion.longitude,
                }}
                waypoints={this.props.chosenNearbyPlaces.map((nearbyPlace) => {
                  return {
                    latitude: nearbyPlace.lat,
                    longitude: nearbyPlace.lng,
                  };
                })}
              /> */}
            </MapView>

            {/* <TouchableOpacity style={styles.button}> */}
            <Fab
              style={{
                position: "absolute",
                top: "0%",
              }}
              getChosenNearbyPlaces={this.props.getChosenNearbyPlaces}
              saveMap={this.props.saveMap}
              watchForLocationChanges={this.props.watchForLocationChanges}
            />

            {this.props.trackingUserBool ? (
              <View
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "10%",
                  width: "100%",
                }}
              >
                <UserTrack
                  distanceTravelled={this.props.userTrack.distanceTravelled}
                  timeTaken={this.props.userTrack.timeTaken}
                />
              </View>
            ) : null}

            <Card style={{width:200}}>
              <CardItem>
                <Text>Distance: {this.props.waypointsRoute.routeDistance}</Text>
              </CardItem>
              <CardItem>
                <Text>Time: {this.props.waypointsRoute.routeDuration}</Text>
              </CardItem>
            </Card>

            {/* </TouchableOpacity> */}
          </View>
        ) : null}
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,

    height: Dimensions.get("window").height,

    // width: Dimensions.get("window").width,

    // height: Dimensions.get("window").height,
    // // zIndex: -1,

    // ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: "absolute",
    top: "0%", //for center align
    // width: 20,
    // height: 20,
    // top: 10,
    // left: 10,
    // zIndex: 10,
  },
});
