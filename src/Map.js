import React, { Component } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline,
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
import { Icon, Input, Item } from "native-base";
import Config from "./Config";
import GOOGLE_MAPS_APIKEY from "../API_KEY";
import Fab from "./FAB";
import { Container, Header } from "native-base";
import { AsyncStorage } from "react-native";

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LOCATIONS_CHOSEN = 2;
class Map extends Component {
  state = {
    initialRegion: {
      latitude: 51.30219236492249,
      longitude: -0.5825332310526248,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    radiusDistance: 1000,
    allNearbyPlaces: [
      {
        lat: 51.305243,
        lng: -0.5788289,
        name: "Greys",
      },
      {
        lat: 51.307417,
        lng: -0.582268,
        name: "Ryan Roofing",
      },
      {
        lat: 51.306417,
        lng: -0.582238,
        name: "Sohum Roofing",
      },
      {
        lat: 51.304417,
        lng: -0.582248,
        name: "Someone Roofing",
      },
      {
        lat: 51.308417,
        lng: -0.582278,
        name: "Hi",
      },
    ],

    // allNearbyPlaces: null,
    chosenNearbyPlaces: null,
  };

  componentDidMount() {
    // this.getAllNearbyPlaces();
    this.getChosenNearbyPlaces();
  }
  getCurrentLoaction = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({ region: initialRegion });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  getAllNearbyPlaces = () => {
    let queryParams =
      "location=" +
      this.state.initialRegion.latitude +
      "," +
      this.state.initialRegion.longitude +
      "&radius=" +
      this.state.radiusDistance +
      "&opennow&key=" +
      GOOGLE_MAPS_APIKEY;
    console.log(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        queryParams
    );
    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        queryParams
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log("bad");

          alert(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          console.log(data);
          this.setState({ allNearbyPlaces: data.results }, () => {
            this.getChosenNearbyPlaces();
          });
        });
      })
      .catch((err) => {
        console.log("bad");
      });
  };
  getChosenNearbyPlaces = () => {
    var tempArrIdx = [];
    let newdata = [];
    console.log("############################");

    console.log(this.state.allNearbyPlaces.length);
    console.log("############################");

    if (this.state.allNearbyPlaces.length >= LOCATIONS_CHOSEN) {
      while (tempArrIdx.length <= LOCATIONS_CHOSEN) {
        var r = Math.floor(Math.random() * this.state.allNearbyPlaces.length);
        if (tempArrIdx.indexOf(r) === -1) {
          newdata.push(this.state.allNearbyPlaces[r]);
          tempArrIdx.push(r);
        }
      }
      console.log("nearbyPlac");

      this.setState({ chosenNearbyPlaces: newdata });
    }
  };
  handleRadiusDistanceChange = (text) => {
    console.log(text);
    this.setState({ radiusDistance: parseFloat(text) });
  };

  saveMap = () => {
    console.log("saved");
    var dateNow = new Date().toLocaleString();

    const _storeData = async () => {
      try {
        // console.log(JSON.stringify(this.state));
        await AsyncStorage.setItem(dateNow, JSON.stringify(this.state));
      } catch (error) {
        console.log(error);
      }
    };
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(dateNow);
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };
    // const _removeData = async () => {
    //   try {
    //     const value = await AsyncStorage.removeItem(dateNow);
    //     if (value !== null) {
    //       // We have data!!
    //       console.log(value);
    //     }
    //   } catch (error) {
    //     console.log(error);

    //     // Error retrieving data
    //   }
    // };
    // const clearAllData = () => {
    //   AsyncStorage.getAllKeys()
    //     .then((keys) => AsyncStorage.multiRemove(keys))
    //     .then(() => alert("success"));
    // };
    _storeData();
    _retrieveData();
    // clearAllData();
  };

  render() {
    return (
      <View>
        {this.state.allNearbyPlaces !== null &&
        this.state.chosenNearbyPlaces !== null ? (
          <View style={styles.container}>
            <MapView
              showsUserLocation
              followsUserLocation
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              region={this.state.initialRegion}
            >
              {this.state.chosenNearbyPlaces.map((nearbyPlaces, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: nearbyPlaces.lat,
                    longitude: nearbyPlaces.lng,
                  }}
                  title={nearbyPlaces.name}
                />
              ))}

              <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                mode={"WALKING"}
                strokeColor="hotpink"
                origin={{
                  latitude: this.state.initialRegion.latitude,
                  longitude: this.state.initialRegion.longitude,
                }}
                destination={{
                  latitude: this.state.initialRegion.latitude,
                  longitude: this.state.initialRegion.longitude,
                }}
                waypoints={this.state.chosenNearbyPlaces.map((nearbyPlace) => {
                  return {
                    latitude: nearbyPlace.lat,
                    longitude: nearbyPlace.lng,
                  };
                })}
              />

              <Circle
                center={{
                  latitude: this.state.initialRegion.latitude,
                  longitude: this.state.initialRegion.longitude,
                }}
                radius={this.state.radiusDistance}
              />
            </MapView>

            <TouchableOpacity style={styles.button}>
              <Fab
                style={styles.button}
                getChosenNearbyPlaces={this.getChosenNearbyPlaces}
                saveMap={this.saveMap}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,

    height: Dimensions.get("window").height,
    // ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,

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
