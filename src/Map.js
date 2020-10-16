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
import AnimatedPolyline from "./utils/AnimatedPolyline";
const WALKING_SPEED = 1.3; //m/s
const DRIVING_SPEED = 7; //m/s
class Map extends Component {
  render() {
    let searchDistance = 0;

    if (this.props.isoline.rangeType === "distance") {
      searchDistance = this.props.isoline.radiusMagnitude;
    } else if (this.props.isoline.rangeType === "time") {
      if (this.props.isoline.transportMode === "pedestrian") {
        searchDistance = this.props.isoline.radiusMagnitude * WALKING_SPEED;
      } else if (
        this.props.isoline.transportMode === "car" ||
        this.props.isoline.transportMode === "truck"
      ) {
        searchDistance = this.props.isoline.radiusMagnitude * DRIVING_SPEED;
      }
    }
    return (
      <View>
        {this.props.chosenNearbyPlaces !== null ||
        this.props.initialRegion !== null ? (
          <View style={styles.container}>
            <MapView
              showsUserLocation
              followsUserLocation
              // onUserLocationChange={event => console.log(event.nativeEvent)}

              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              region={this.props.initialRegion}
            >
              {this.props.chosenNearbyPlaces !== null
                ? this.props.chosenNearbyPlaces.map((nearbyPlaces, i) => (
                    <Marker
                      key={i}
                      coordinate={{
                        latitude: nearbyPlaces.lat,
                        longitude: nearbyPlaces.lng,
                      }}
                      title={nearbyPlaces.name}
                    />
                  ))
                : null}
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
                  interval={1}
                  steps={1}
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
              {/* <Circle
                center={{
                  latitude: this.props.initialRegion.latitude,
                  longitude: this.props.initialRegion.longitude,
                }}
                radius={searchDistance}
              /> */}
            </MapView>

            {/* <TouchableOpacity style={styles.button}> */}
            <View
              style={{
                position: "absolute", //use absolute position to show button on top of the map
                top: "0%", //for center align
              }}
            >
              <Fab
                getChosenNearbyPlaces={this.props.getChosenNearbyPlaces}
                saveMap={this.props.saveMap}
                watchForLocationChanges={this.props.watchForLocationChanges}
              />
            </View>

            {this.props.trackingUserBool ? (
              <View
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "70%",
                  zIndex: 10,
                }}
              >
                <UserTrack
                  distanceTravelled={this.props.userTrack.distanceTravelled}
                  timeTaken={this.props.userTrack.timeTaken}
                />
              </View>
            ) : null}
            {/* 
            <Card
              style={{
                position: "absolute",
                top: "0%",
                left: "20%",
              }}
            >
              <CardItem>
                <Text>Distance: {this.props.waypointsRoute.routeDistance}</Text>
              </CardItem>
              <CardItem>
                <Text>Time: {this.props.waypointsRoute.routeDuration}</Text>
              </CardItem>
            </Card> */}
            <View
              style={{
                position: "absolute",
                top: "0%",
                right: "45%",
              }}
            >
              <Text>
                Route Distance: {this.props.waypointsRoute.routeDistance}
              </Text>

              <Text>Route Time: {this.props.waypointsRoute.routeDuration}</Text>
            </View>

            <View
              style={{
                position: "absolute",
                top: "0%",
                right: "5%",
              }}
            >
              <Text>
                Mode:{" "}
                {this.props.isoline.transportMode.charAt(0).toUpperCase() +
                  this.props.isoline.transportMode.slice(1)}
              </Text>
              <Text>
                Range : {this.props.isoline.radiusMagnitude}
                {this.props.isoline.rangeType === "distance" ? "m" : "s"}
              </Text>
            </View>

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
    width: Dimensions.get("window").width,

    height: Dimensions.get("window").height - 140,
    // flex: 1,
  },
  mapStyle: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,

    // width: Dimensions.get("window").width,

    // height: Dimensions.get("window").height,

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
