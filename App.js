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
    chosenNearbyPlaces: [
      {
        lat: 51.305243,
        lng: -0.5788289,
        name: "Greys",
      },
      {
        lat: 51.308417,
        lng: -0.582278,
        name: "Hi",
      },
      {
        lat: 51.304417,
        lng: -0.582248,
        name: "Someone Roofing",
      },
    ],
  };
  async componentDidMount() {
    // this.getCurrentLocation()
    // this.getAllNearbyPlaces()
    // this.getChosenNearbyPlaces();
    this.getRecentMapFromDB();

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  handleRadiusDistanceChange = (text) => {
    this.setState({ radiusDistance: text });
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
    console.log(this.state.radiusDistance, typeof this.state.radiusDistance);
    let queryParams =
      "location=" +
      this.state.initialRegion.latitude +
      "," +
      this.state.initialRegion.longitude +
      "&radius=" +
      this.state.radiusDistance +
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
          this.setState({ allNearbyPlaces: allNearbyPlaces }, () => {
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

    if (this.state.allNearbyPlaces.length >= LOCATIONS_CHOSEN) {
      while (tempArrIdx.length <= LOCATIONS_CHOSEN) {
        var r = Math.floor(Math.random() * this.state.allNearbyPlaces.length);
        if (tempArrIdx.indexOf(r) === -1) {
          newdata.push(this.state.allNearbyPlaces[r]);
          tempArrIdx.push(r);
        }
      }


      this.setState({ chosenNearbyPlaces: newdata });
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
          radiusDistance: this.state.radiusDistance,
          allNearbyPlaces: this.state.allNearbyPlaces,
          chosenNearbyPlaces: this.state.chosenNearbyPlaces,
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
    _retrieveData();
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
          let newValue = JSON.parse(value);
          this.setState({
            initialRegion: newValue.initialRegion,
            radiusDistance: newValue.radiusDistance,
            allNearbyPlaces: newValue.allNearbyPlaces,
            chosenNearbyPlaces: newValue.chosenNearbyPlaces,
          });
        }
      } catch (error) {
        // Error retrieving data

        console.log(error);
      }
    };

    _retrieveAllData();
  };

  setNewMap = (mapObj) => {
    this.setState({
      initialRegion: mapObj.initialRegion,
      radiusDistance: mapObj.radiusDistance,
      allNearbyPlaces: mapObj.allNearbyPlaces,
      chosenNearbyPlaces: mapObj.chosenNearbyPlaces,
    });
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
            <Map
              initialRegion={this.state.initialRegion}
              radiusDistance={this.state.radiusDistance}
              allNearbyPlaces={this.state.allNearbyPlaces}
              chosenNearbyPlaces={this.state.chosenNearbyPlaces}
              getChosenNearbyPlaces={this.getChosenNearbyPlaces}
              saveMap={this.saveMap}
            />
          ) : null}
          {this.state.selectedFooterTab === "Settings" ? (
            <Settings
              handleRadiusDistanceChange={this.handleRadiusDistanceChange}
              getAllNearbyPlaces={this.getAllNearbyPlaces}
              radiusDistance={this.state.radiusDistance}
              handleChangeFooterTab={this.handleChangeFooterTab}
            />
          ) : null}
          {this.state.selectedFooterTab === "Profile" ? (
            <Profile
              setNewMap={this.setNewMap}
              handleChangeFooterTab={this.handleChangeFooterTab}
            />
          ) : null}
        </Layout>
      </Container>
    );
  }
}

const Stack = createStackNavigator();
