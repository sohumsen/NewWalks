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
import GOOGLE_MAPS_APIKEY from '../API_KEY'
const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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
    nearbyPlaces: null,
    coordsOfRoute: null,
  };
  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       var lat = parseFloat(position.coords.latitude);
  //       var long = parseFloat(position.coords.longitude);

  //       var initialRegion = {
  //         latitude: lat,
  //         longitude: long,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       };
  //       console.log(initialRegion);
  //       this.setState({ region: initialRegion });
  //     },
  //     (error) => alert(JSON.stringify(error)),
  //     { enableHighAccuracy: true, timeout: 20000 }
  //   );
  //   console.log("mounted");
  // }
  componentDidMount() {
    this.getNearbyPlaces();
  }
  getNearbyPlaces = () => {
    console.log("pressed");
      this.props.onSelectConfigButton()
    let queryParams =
      "location=" +
      this.state.region.latitude +
      "," +
      this.state.region.longitude +
      "&radius=" +
      this.state.radiusDistance +
      "&opennow&key=AIzaSyD-23HK9Pf0abE39PWf-APkqtn3VxrwTrQ";
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
          var tempArrIdx = [];
          let newdata = [];

          while (tempArrIdx.length <= 3) {
            var r = Math.floor(Math.random() * data.results.length);
            if (tempArrIdx.indexOf(r) === -1) {
              newdata.push(data.results[r]);
              tempArrIdx.push(r);
            }
          }

          this.setState({ nearbyPlaces: newdata }, () => {
            console.log(this.state.nearbyPlaces);
          });
        });
      })
      .catch((err) => {
        console.log("bad");
      });
  };
  handleRadiusDistanceChange = (text) => {
    if (!isNaN(text)) {
      this.setState({ radiusDistance: text });
    }
  };

  getWalkingRoute = () => {
    let mode = "walking";
    let origin = this.state.region.latitude + "," + this.state.region.longitude;
    let destination =
      this.state.region.latitude + "," + this.state.region.longitude;
    const APIKEY = GOOGLE_MAPS_APIKEY;
    let waypoints = this.state.nearbyPlaces.results.map((nearbyPlace) => {
      return { location: nearbyPlace.place_id, stopover: false };
    });
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}&waypoints=${waypoints}`; //&waypoints =${waypoints}

    console.log("###################################");

    console.log(url);

    //https://maps.googleapis.com/maps/api/directions/json?origin=51.30219236492249,-0.5825332310526248&destination=51.30219236492249,-0.5825332310526248&key=AIzaSyD-23HK9Pf0abE39PWf-APkqtn3VxrwTrQ&mode=walking&waypoints =ChIJ94aezArXdUgRbp7JNACo_Ng,ChIJQ1uz5p7XdUgRpfQbWm2me3o

    //https://maps.googleapis.com/maps/api/directions/json?origin=51.30219236492249,-0.5825332310526248&destination=51.30219236492249,-0.5825332310526248&key=AIzaSyD-23HK9Pf0abE39PWf-APkqtn3VxrwTrQ&mode=walking&waypoints=ChIJ94aezArXdUgRbp7JNACo_Ng,ChIJQ1uz5p7XdUgRpfQbWm2me3o
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.routes.length !== 0) {
          this.setState(
            {
              coordsOfRoute: this.decode(
                responseJson.routes[0].overview_polyline.points
              ), // definition below
            },
            () => {
              console.log(this.state.coordsOfRoute);
            }
          );
        } else {
          console.log(responseJson);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  decode = (t, e) => {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map(function (t) {
      return { latitude: t[0], longitude: t[1] };
    }));
  };
  render() {
    let waypoints = null;
    if (this.state.nearbyPlaces !== null) {
      waypoints = this.state.nearbyPlaces.map((nearbyPlace) => {
        return {
          latitude: nearbyPlace.geometry.location.lat,
          longitude: nearbyPlace.geometry.location.lng,
        };
      });
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          {this.props.selectConfig ? <Config radiusDistance={this.state.radiusDistance} getNearbyPlaces={this.getNearbyPlaces} handleRadiusDistanceChange={this.handleRadiusDistanceChange}/> : null}

          {this.state.nearbyPlaces !== null ? (
            <MapView
              showsUserLocation
              followsUserLocation
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              region={this.state.region}
            >
              {this.state.nearbyPlaces.map((nearbyPlaces, i) => (
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
                waypoints={waypoints}
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
