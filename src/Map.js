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
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { Icon, Input, Item } from "native-base";
import Config from "./Config";
import GOOGLE_MAPS_APIKEY from "../API_KEY";
const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LOCATIONS_CHOSEN = 3;
class Map extends Component {
  state = {
    region: {
      latitude: 51.30219236492249,
      longitude: -0.5825332310526248,
      latitudeDelta: 0.001922,
      longitudeDelta: 0.05183658170914543,
    },
    radiusDistance: 1000,
    // nearbyPlaces: {
    //   html_attributions: [],
    //   results: [
    //     {
    //       business_status: "OPERATIONAL",
    //       geometry: {
    //         location: {
    //           lat: 51.305243,
    //           lng: -0.5788289,
    //         },
    //         viewport: {
    //           northeast: {
    //             lat: 51.30654978029149,
    //             lng: -0.577301319708498,
    //           },
    //           southwest: {
    //             lat: 51.30385181970849,
    //             lng: -0.5799992802915021,
    //           },
    //         },
    //       },
    //       icon:
    //         "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
    //       name: "Greys",
    //       opening_hours: {
    //         open_now: true,
    //       },
    //       place_id: "ChIJ94aezArXdUgRbp7JNACo_Ng",
    //       plus_code: {
    //         compound_code: "8C4C+3F Woking, UK",
    //         global_code: "9C3X8C4C+3F",
    //       },
    //       rating: 4.5,
    //       reference: "ChIJ94aezArXdUgRbp7JNACo_Ng",
    //       scope: "GOOGLE",
    //       types: ["health", "point_of_interest", "establishment"],
    //       user_ratings_total: 2,
    //       vicinity: "Hook Heath Road, Woking",
    //     },
    //     {
    //       business_status: "OPERATIONAL",
    //       geometry: {
    //         location: {
    //           lat: 51.307417,
    //           lng: -0.582268,
    //         },
    //         viewport: {
    //           northeast: {
    //             lat: 51.30874023029151,
    //             lng: -0.580889119708498,
    //           },
    //           southwest: {
    //             lat: 51.30604226970851,
    //             lng: -0.5835870802915021,
    //           },
    //         },
    //       },
    //       icon:
    //         "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
    //       name: "Ryan Roofing",
    //       opening_hours: {
    //         open_now: true,
    //       },
    //       photos: [
    //         {
    //           height: 2448,
    //           html_attributions: [
    //             '<a href="https://maps.google.com/maps/contrib/104707017742871780021">Ryan Roofing</a>',
    //           ],
    //           photo_reference:
    //             "CmRaAAAAtQzcupgp8uuNLUSfTvP6doQGWZUKHuj7MktDDYRzczaTkOGkK6tZNNfgJ6z7TD6llvcVuhL9ZWb7hPO3PNgnvqgB9o04UaEEjIhTv4nr_KNBTYr81jM2-I5ZWIcIuASEEhARnxJ4JAO8ZxOosP1P40tXGhRWdgalO6A8zVID__co2mrL6B_0yw",
    //           width: 3264,
    //         },
    //       ],
    //       place_id: "ChIJQ1uz5p7XdUgRpfQbWm2me3o",
    //       plus_code: {
    //         compound_code: "8C49+X3 Woking, UK",
    //         global_code: "9C3X8C49+X3",
    //       },
    //       rating: 4,
    //       reference: "ChIJQ1uz5p7XdUgRpfQbWm2me3o",
    //       scope: "GOOGLE",
    //       types: ["roofing_contractor", "point_of_interest", "establishment"],
    //       user_ratings_total: 4,
    //       vicinity: "Bengairn, Mile Path, Hook Heath,, Woking",
    //     },
    //   ],
    //   status: "OK",
    // },
    // allNearbyPlaces:null,
    allNearbyPlaces: null,
    chosenNearbyPlaces: null,
    coordsOfRoute: null,
    waypoints:null
  };

  componentDidMount() {
    this.getAllNearbyPlaces();
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
        console.log(initialRegion);
        this.setState({ region: initialRegion });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  getAllNearbyPlaces = () => {
    let queryParams =
      "location=" +
      this.state.region.latitude +
      "," +
      this.state.region.longitude +
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

    console.log(this.state.allNearbyPlaces);
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
      let waypoints = newdata.map((nearbyPlace) => {
        return {
          latitude: nearbyPlace.geometry.location.lat,
          longitude: nearbyPlace.geometry.location.lng,
        };
      });
      this.setState({ chosenNearbyPlaces: newdata,waypoints:waypoints }, () => {
        console.log(this.state.chosenNearbyPlaces);
      });
    }
  };
  handleRadiusDistanceChange = (text) => {
    console.log(text);
    this.setState({ radiusDistance: parseFloat(text) });
  };

  render() {
    let waypoints = null;
    console.log(this.state.chosenNearbyPlaces);

    if (this.state.chosenNearbyPlaces !== null) {
      waypoints = this.state.chosenNearbyPlaces.map((nearbyPlace) => {
        return {
          latitude: nearbyPlace.geometry.location.lat,
          longitude: nearbyPlace.geometry.location.lng,
        };
      });
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          {/* {this.props.selectConfig ? (
            <Config
              radiusDistance={this.state.radiusDistance}
              getNearbyPlaces={this.getChosenNearbyPlaces}
              handleRadiusDistanceChange={this.handleRadiusDistanceChange}
            />
          ) : null} */}

          {this.state.allNearbyPlaces !== null &&
          this.state.chosenNearbyPlaces !== null? (
            <MapView
              showsUserLocation
              followsUserLocation
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              region={this.state.region}
              //   onRegionChangeComplete ={region => {
              //     this.setState({region:region});
              // }}
            >
              {this.state.chosenNearbyPlaces.map((nearbyPlaces, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: nearbyPlaces.geometry.location.lat,
                    longitude: nearbyPlaces.geometry.location.lng,
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
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                }}
                destination={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                }}
                waypoints={this.state.waypoints}
              />

              <Circle
                center={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                }}
                radius={this.state.radiusDistance}
              />
            </MapView>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 100,
    left: 10,
    alignSelf: "flex-end",
  },
});
