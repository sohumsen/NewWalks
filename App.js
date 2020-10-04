import React from "react";
import { AppLoading } from "expo";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Layout from "./src/Layout";
import Map from "./src/Map";
import Settings from "./src/Settings";
import Profile from "./src/Profile/Profile";
import { AsyncStorage, Dimensions } from "react-native";

import Constants from "expo-constants";
import { Root } from "native-base";
import { createSwitchNavigator, StackNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GOOGLE_MAPS_APIKEY from "./API_KEY";
import NewMap from "./src/newMap";
import haversine from "haversine";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Newmap2 from "./src/newmap2";
import decode from "./src/utils/decoderHERE";
import deltaGenerate from "./src/utils/deltaGenerate";

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LOCATIONS_CHOSEN = 2;

export default class App extends React.Component {
  state = {
    isReady: false,
    selectedFooterTab: "Map",

    initialRegion: {
      latitude: 51.30219236492249,
      longitude: -0.5825332310526248,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },

    nearbyPlaces: {
      // allNearbyPlaces: [
      //   {
      //     lat: 51.305243,
      //     lng: -0.5788289,
      //     name: "Greys",
      //   },
      //   {
      //     lat: 51.307417,
      //     lng: -0.582268,
      //     name: "Ryan Roofing",
      //   },
      //   {
      //     lat: 51.306417,
      //     lng: -0.582238,
      //     name: "Sohum Roofing",
      //   },
      //   {
      //     lat: 51.304417,
      //     lng: -0.582248,
      //     name: "Someone Roofing",
      //   },
      //   {
      //     lat: 51.308417,
      //     lng: -0.582278,
      //     name: "Hi",
      //   },
      // ],
      // chosenNearbyPlaces: [
      //   {
      //     lat: 51.305243,
      //     lng: -0.5788289,
      //     name: "Greys",
      //   },
      //   {
      //     lat: 51.308417,
      //     lng: -0.582278,
      //     name: "Hi",
      //   },
      //   {
      //     lat: 51.304417,
      //     lng: -0.582248,
      //     name: "Someone Roofing",
      //   },
      // ],
      chosenNearbyPlaces: null,
      allNearbyPlaces: null,
    },

    isoline: {
      encodedIsoline: "",
      decodedIsoline: [],
      transportMode: "pedestrian",
      rangeType: "distance",
      radiusMagnitude: 2000,
    },

    userTrack: {
      routeCoordinates: [],
      distanceTravelled: 0,
      timeTaken: 0,
    },

    // coordinate: new AnimatedRegion({
    //   latitude: LATITUDE,
    //   longitude: LONGITUDE
    //  }),

    //  prevLatLng: {},
  };
  async componentDidMount() {
    // this.getCurrentLocation()
    // this.getAllNearbyPlaces();
    // this.getChosenNearbyPlaces();
    this.getRecentMapFromDB();
    // this.watchForLocationChanges();
    // this.getIsoline();

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  getIsoline = () => {
    let origin =
      "&origin=" +
      this.state.initialRegion.latitude +
      "," +
      this.state.initialRegion.longitude;
    let transportMode = "transportMode=" + this.state.isoline.transportMode;
    let distance =
      "&range[type]=" +
      this.state.isoline.rangeType +
      "&range[values]=" +
      this.state.isoline.radiusMagnitude;
    fetch(
      "https://isoline.router.hereapi.com/v8/isolines?" +
        transportMode +
        distance +
        origin +
        "&apiKey=nMr30cwufvwivVzg5hZkozfTavfHBeRAc-ktxTc04FU&legAttributes=shape"
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
          let isoline = { ...this.state.isoline };
          let decodedIsoline = decode(data.isolines[0].polygons[0].outer).map(
            (line) => {
              return {
                latitude: line[0],
                longitude: line[1],
              };
            }
          );
          isoline.encodedIsoline = data.isolines[0].polygons[0].outer;
          isoline.decodedIsoline = decodedIsoline;

          this.setState({ isoline: isoline });
        });
      })
      .catch((err) => {
        console.log("bad");
      });
  };

  handleSettingsInputChange = (name, value) => {
    let isoline = { ...this.state.isoline };
    isoline[name] = value;
    this.setState({ isoline: isoline });
  };

  getCurrentLocation = () => {
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
      this.state.isoline.radiusMagnitude +
      "&opennow&key=" +
      GOOGLE_MAPS_APIKEY;

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
          let allNearbyPlaces = data.results.map((place) => {
            return {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
              name: place.name,
            };
          });
          let nearbyPlaces = { ...this.state.nearbyPlaces };
          nearbyPlaces.allNearbyPlaces = allNearbyPlaces;
          this.setState({ nearbyPlaces: nearbyPlaces }, () => {
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

    if (this.state.nearbyPlaces.allNearbyPlaces.length >= LOCATIONS_CHOSEN) {
      while (tempArrIdx.length <= LOCATIONS_CHOSEN) {
        var r = Math.floor(
          Math.random() * this.state.nearbyPlaces.allNearbyPlaces.length
        );
        if (tempArrIdx.indexOf(r) === -1) {
          newdata.push(this.state.nearbyPlaces.allNearbyPlaces[r]);
          tempArrIdx.push(r);
        }
      }
      let nearbyPlaces = { ...this.state.nearbyPlaces };
      nearbyPlaces.chosenNearbyPlaces = newdata;
      this.setState({ nearbyPlaces: nearbyPlaces });
    }
  };

  handleChangeFooterTab = (name) => {
    this.setState({ selectedFooterTab: name });
  };
  saveMap = () => {
    var dateNow = new Date().toLocaleString();

    const _storeData = async () => {
      try {
        let mapObj = {
          initialRegion: this.state.initialRegion,
          nearbyPlaces: this.state.nearbyPlaces,
          isoline: {
            encodedIsoline: this.state.isoline.encodedIsoline,
            decodedIsoline: [],
            transportMode: this.state.isoline.transportMode,
            rangeType: this.state.isoline.rangeType,
            radiusMagnitude: this.state.isoline.radiusMagnitude,
          },
          userTrack: this.state.userTrack,
        };
        // console.log(JSON.stringify(this.state));
        await AsyncStorage.setItem(dateNow, JSON.stringify(mapObj));
      } catch (error) {
        console.log(error);
      }
    };
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(dateNow);
        if (value !== null) {
          // We have data!!
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
    // _retrieveData();
    // clearAllData();
  };
  getRecentMapFromDB = () => {
    const _retrieveAllData = async () => {
      console.log("getAllKeys");
      try {
        const value = await AsyncStorage.getAllKeys();
        if (value !== null || value.length !== 0) {
          _retrieveData(value[0]);
        } else {
          this.getChosenNearbyPlaces();
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };
    const _retrieveData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // We have data!!
          let mapObj = JSON.parse(value);
          this.setNewMap(mapObj);
        }
      } catch (error) {
        // Error retrieving data

        console.log(error);
      }
    };

    _retrieveAllData();
  };

  setNewMap = (mapObj) => {
    console.log(
      deltaGenerate(
        decode(mapObj.isoline.encodedIsoline).map((line) => {
          return {
            latitude: line[0],
            longitude: line[1],
          };
        })
      )
    );
    this.setState({
      selectedFooterTab: "Map",

      initialRegion: mapObj.initialRegion,
      nearbyPlaces: mapObj.nearbyPlaces,
      isoline: {
        encodedIsoline: mapObj.isoline.encodedIsoline,
        decodedIsoline: decode(mapObj.isoline.encodedIsoline).map((line) => {
          return {
            latitude: line[0],
            longitude: line[1],
          };
        }),
        transportMode: mapObj.isoline.transportMode,
        rangeType: mapObj.isoline.rangeType,
        radiusMagnitude: mapObj.isoline.radiusMagnitude,
      },
      userTrack: mapObj.userTrack,
    });
  };

  watchForLocationChanges = () => {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        // const {
        //   coordinate,
        //   userRouteCoordinates,
        //   userDistanceTravelled,
        // } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude: latitude,
          longitude: longitude,
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        }
        // else {
        //   coordinate.timing(newCoordinate).start();
        // }

        let initialRegion = { ...this.state.initialRegion };
        initialRegion.latitude = latitude;
        initialRegion.longitude = longitude;

        let userTrack = { ...this.state.userTrack };
        userTrack.routeCoordinates = userTrack.routeCoordinates.concat(
          newCoordinate
        );
        userTrack.distanceTravelled =
          userTrack.distanceTravelled + this.calcDistance(newCoordinate);

        this.setState({
          initialRegion: initialRegion,
          userTrack: userTrack,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  calcDistance = (newLatLng) => {
    let prevLatLng = {
      lat: this.state.initialRegion.latitude,
      lng: this.state.initialRegion.longitude,
    };
    return haversine(prevLatLng, newLatLng) || 0;
  };
  submitSettings = () => {
    console.log("submitted");
    this.getAllNearbyPlaces();
    this.handleChangeFooterTab("Map");
    this.getIsoline();
  };

  render() {
    // var directions = new GDirections ();

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Layout
          selectedFooterTab={this.state.selectedFooterTab}
          handleChangeFooterTab={this.handleChangeFooterTab}
        >
          {/* <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Map">
                {(props) => <Map {...props} extraData={someData} />}
              </Stack.Screen>
              <Stack.Screen name="Map" component={<Map />} />
            </Stack.Navigator>
          </NavigationContainer> */}
          {this.state.selectedFooterTab === "Map" ? (
            // <Newmap2/>
            <Map
              initialRegion={this.state.initialRegion}
              radiusMagnitude={this.state.radiusMagnitude}
              allNearbyPlaces={this.state.nearbyPlaces.allNearbyPlaces}
              chosenNearbyPlaces={this.state.nearbyPlaces.chosenNearbyPlaces}
              routeCoordinates={this.state.userTrack.routeCoordinates}
              isoline={this.state.isoline.decodedIsoline}
              watchForLocationChanges={this.watchForLocationChanges}
              getChosenNearbyPlaces={this.getChosenNearbyPlaces}
              saveMap={this.saveMap}
            />
          ) : null}
          {this.state.selectedFooterTab === "Settings" ? (
            <Settings
              radiusMagnitude={this.state.isoline.radiusMagnitude}
              rangeType={this.state.isoline.rangeType}
              transportMode={this.state.isoline.transportMode}
              handleSettingsInputChange={this.handleSettingsInputChange}
              submitSettings={this.submitSettings}
            />
          ) : null}
          {this.state.selectedFooterTab === "Profile" ? (
            <Profile setNewMap={this.setNewMap} />
          ) : null}
        </Layout>
      </Container>
    );
  }
}

const Stack = createStackNavigator();
