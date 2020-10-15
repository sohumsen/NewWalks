import React from "react";
import * as SplashScreen from 'expo-splash-screen';

import { AppLoading } from "expo";
import { Container, Toast } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Layout from "./src/Layout";
import Map from "./src/Map";
import Settings from "./src/Settings";
import Profile from "./src/Profile/Profile";
import { AsyncStorage, Dimensions } from "react-native";
import * as Location from "expo-location";

import Constants from "expo-constants";
import { Root } from "native-base";
import { createSwitchNavigator, StackNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GOOGLE_MAPS_APIKEY from "./GOOGLE_API_KEY";
import HERE_API_KEY from "./HERE_API_KEY";
import NewMap from "./src/newMap";
import haversine from "haversine";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Newmap2 from "./src/newmap2";
import decoderHERE from "./src/utils/decoderHERE";
import deltaGenerate from "./src/utils/deltaGenerate";
import decoderGOOGLE from "./src/utils/decoderGOOGLE";
import {
  getBounds,
  getDistance,
  getPreciseDistance,
  isPointInPolygon,
} from "geolib";
const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LOCATIONS_CHOSEN = 3;
const WALKING_SPEED = 0.6; //m/s
const DRIVING_SPEED = 7; //m/s

export default class App extends React.Component {
  state = {
    isReady: false,
    selectedFooterTab: "Map",
    trackingUserBool: false,
    numberOfRequstsByUser: 0,

    initialRegion: {
      latitude: 51.30219236492249,
      longitude: -0.5825332310526248,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      // latitude: 2,
      // longitude: 2,
      // latitudeDelta: LATITUDE_DELTA,
      // longitudeDelta: LONGITUDE_DELTA,
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

    waypointsRoute: {
      decodedPoints: "",
      encodedPoints: "",
      routeDuration: "",
      routeDistance: "",
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
  // componentWillUnmount() {
  //   this.storeMapIfNecessary();
  // }
  storeMapIfNecessary = () => {
    const _retrieveAllData = async () => {
      try {
        const value = await AsyncStorage.getAllKeys();
        if (value.length === 0) {
          this.saveMap();
        }
      } catch (error) {
        // Error retrieving data
        Toast.show({
          text: "Oops, something went wrong",
          buttonText: "Okay",
          type: "danger",
        });
      }
    };

    _retrieveAllData();
  };
  async componentDidMount() {
    // this.getCurrentLocation()
    // this.getChosenNearbyPlaces();

    // this.getRecentMapFromDB();
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.getCurrentLocation();

  
    // this.watchForLocationChanges();

    // this.watchForLocationChanges();

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
        "&apiKey=" +
        HERE_API_KEY +
        "&legAttributes=shape"
    )
      .then((response) => {
        if (response.status !== 200) {
          Toast.show({
            text: "Error: " + response.status,
            buttonText: "Okay",
            type: "danger",
          });

          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          let isoline = { ...this.state.isoline };
          let decodedIsoline = decoderHERE(
            data.isolines[0].polygons[0].outer
          ).map((line) => {
            return {
              latitude: line[0],
              longitude: line[1],
            };
          });
          isoline.encodedIsoline = data.isolines[0].polygons[0].outer;
          isoline.decodedIsoline = decodedIsoline;
          this.setState({ isoline: isoline }, () => {
            this.getChosenNearbyPlaces();
          });
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

  handleSettingsInputChange = (name, value) => {
    let isoline = { ...this.state.isoline };
    isoline[name] = value;
    this.setState({ isoline: isoline });
  };

  // getCurrentLocation = () => {
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
  //       this.setState({ initialRegion: initialRegion }, () => {
  //         this.getAllNearbyPlaces();
  //         this.getIsoline();
  //       });
  //     },
  //     (error) =>
  //       Toast.show({
  //         text: "Oops, something went wrong",
  //         buttonText: "Okay",
  //         type: "danger",
  //       }),
  //     { enableHighAccuracy: true, timeout: 20000 }
  //   );
  // };

  getCurrentLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          text: "Permission to access location was denied",
          buttonText: "Okay",
          type: "danger",
        });
      }

      let location = await Location.getCurrentPositionAsync({});

      let initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      this.setState({ initialRegion: initialRegion }, () => {
        this.getAllNearbyPlaces();
      });
    })();
  };

  getAllNearbyPlaces = () => {
    let radiusMagnitude = this.state.isoline.radiusMagnitude;

    let searchDistance = 0;

    if (this.state.isoline.rangeType === "distance") {
      searchDistance = radiusMagnitude;
    } else if (this.state.isoline.rangeType === "time") {
      if (this.state.isoline.transportMode === "pedestrian") {
        searchDistance = radiusMagnitude * WALKING_SPEED;
      } else if (
        this.state.isoline.transportMode === "car" ||
        this.state.isoline.transportMode === "truck"
      ) {
        searchDistance = radiusMagnitude * DRIVING_SPEED;
      }
    }

    let queryParams =
      "location=" +
      this.state.initialRegion.latitude +
      "," +
      this.state.initialRegion.longitude +
      "&radius=" +
      searchDistance +
      "&opennow&key=" +
      GOOGLE_MAPS_APIKEY;

    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        queryParams
    )
      .then((response) => {
        if (response.status !== 200) {
          Toast.show({
            text: "Error: " + response.status,
            buttonText: "Okay",
            type: "danger",
          });
          alert(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          if (data.results.length !== 0) {
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
              this.getIsoline();
              // _callback()
            });
          } else {
            Toast.show({
              text: "Error: try increasing the distance in settings",
              buttonText: "Okay",
              type: "danger",
            });
          }
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
  getChosenNearbyPlaces = () => {
    var tempArrIdx = [];
    let newdata = [];

    if (this.state.nearbyPlaces.allNearbyPlaces === null) {
      Toast.show({
        text: "Error: no nearby places found",
        buttonText: "Okay",
        type: "danger",
      });
    } else {
      if (this.state.nearbyPlaces.allNearbyPlaces.length >= LOCATIONS_CHOSEN) {
        while (tempArrIdx.length <= LOCATIONS_CHOSEN) {
          var r = Math.floor(
            Math.random() * this.state.nearbyPlaces.allNearbyPlaces.length
          );
          if (
            tempArrIdx.indexOf(r) === -1 &&
            isPointInPolygon(
              this.state.nearbyPlaces.allNearbyPlaces[r],
              this.state.isoline.decodedIsoline
            )
          ) {
            newdata.push(this.state.nearbyPlaces.allNearbyPlaces[r]);

            tempArrIdx.push(r);
          }
        }
        let nearbyPlaces = { ...this.state.nearbyPlaces };
        let initialRegion = { ...this.state.initialRegion };

        let { maxLat, minLat } = getBounds(newdata);
        console.log(deltaGenerate(newdata));
        // console.log(maxLat,minLat,"=",maxLat-minLat)
        initialRegion.latitudeDelta = deltaGenerate(newdata).latitudeDelta;
        initialRegion.longitudeDelta =
        deltaGenerate(newdata).longitudeDelta;

        nearbyPlaces.chosenNearbyPlaces = newdata;
        this.setState(
          { nearbyPlaces: nearbyPlaces, initialRegion: initialRegion },
          () => {
            this.getWaypointRoute();
          }
        );
      } else {
        Toast.show({
          text: "Error: not enough nearby places found",
          buttonText: "Okay",
          type: "danger",
        });
      }
    }
  };

  getWaypointRoute = () => {
    let transportMode = "&mode=walking";

    if (this.state.isoline.transportMode === "pedestrian") {
      transportMode = "&mode=walking";
    }
    if (
      this.state.isoline.transportMode === "car" ||
      this.state.isoline.transportMode === "truck"
    ) {
      transportMode = "&mode=driving";
    }

    let origin =
      "origin=" +
      this.state.initialRegion.latitude +
      "%2C" +
      this.state.initialRegion.longitude;
    let destination =
      "&destination=" +
      this.state.initialRegion.latitude +
      "%2C" +
      this.state.initialRegion.longitude;
    let waypoints =
      "&waypoints=" +
      this.state.nearbyPlaces.chosenNearbyPlaces
        .map((latLingObj, i) => {
          if (i === this.state.nearbyPlaces.chosenNearbyPlaces.length-1) {
            return latLingObj.lat + "%2C" + latLingObj.lng;
          } else {
            return latLingObj.lat + "%2C" + latLingObj.lng + "%7Cvia:";
          }
        })
        .join("");
    console.log(
      "https://maps.googleapis.com/maps/api/directions/json?" +
        origin +
        destination +
        waypoints +
        transportMode +
        "&key=" +
        GOOGLE_MAPS_APIKEY
    );
    fetch(
      "https://maps.googleapis.com/maps/api/directions/json?" +
        origin +
        destination +
        waypoints +
        transportMode +
        "&key=" +
        GOOGLE_MAPS_APIKEY
    )
      .then((response) => {
        if (response.status !== 200) {
          Toast.show({
            text: "Oops, something went wrong Code: " + response.status,
            buttonText: "Okay",
            type: "danger",
          });
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          // let decoded = decoderGOOGLE(data.routes[0].overview_polyline.points);
          // let c=decoded.filter((e, i, a) => a.indexOf(e) !== i) // [2, 4]

          // // for (let i = 0; i < decoded.length; i++) {
          // //   if (decoded.indexOf(decoded[i].)!==)

          // // }
          // var valueArr = decoded.map(function latitude(item) {
          //   return item.latitude;
          // });

          // var isDuplicate = valueArr.some(function (item, idx) {
          //   return valueArr.indexOf(item) ;
          // });

          let waypointsRoute = { ...this.state.waypointsRoute };

          waypointsRoute.encodedPoints =
            data.routes[0].overview_polyline.points;
          waypointsRoute.decodedPoints = decoderGOOGLE(
            data.routes[0].overview_polyline.points
          );
          waypointsRoute.routeDuration = data.routes[0].legs[0].duration.text;
          waypointsRoute.routeDistance = data.routes[0].legs[0].distance.text;

          this.setState({
            waypointsRoute: waypointsRoute,
            isReady: true 
          },async () => {
            await SplashScreen.hideAsync();
          });
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
          waypointsRoute: {
            decodedPoints: [],
            encodedPoints: this.state.waypointsRoute.encodedPoints,
            routeDuration: this.state.waypointsRoute.routeDuration,
            routeDistance: this.state.waypointsRoute.routeDistance,
          },

          userTrack: this.state.userTrack,
        };
        await AsyncStorage.setItem(dateNow, JSON.stringify(mapObj));

        Toast.show({
          text: "Saved map",
          buttonText: "Okay",
          type: "success",
        });
      } catch (error) {
        Toast.show({
          text: "Oops, something went wrong",
          buttonText: "Okay",
          type: "danger",
        });
      }
    };

    // const _removeData = async () => {
    //   try {
    //     const value = await AsyncStorage.removeItem(dateNow);
    //     if (value !== null) {
    //       // We have data!!
    //     }
    //   } catch (error) {

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
      try {
        const value = await AsyncStorage.getAllKeys();
        if (value.length !== 0) {
          _retrieveData(value[0]);
        } else {
          //has no map

          this.getAllNearbyPlaces();
        }
      } catch (error) {
        // Error retrieving data
        Toast.show({
          text: "Oops, something went wrong",
          buttonText: "Okay",
          type: "danger",
        });
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

        Toast.show({
          text: "Oops, something went wrong",
          buttonText: "Okay",
          type: "danger",
        });
      }
    };

    _retrieveAllData();
  };

  setNewMap = (mapObj) => {
    this.setState({
      selectedFooterTab: "Map",
      trackingUserBool: false,

      initialRegion: mapObj.initialRegion,
      nearbyPlaces: mapObj.nearbyPlaces,
      isoline: {
        encodedIsoline: mapObj.isoline.encodedIsoline,
        decodedIsoline: decoderHERE(mapObj.isoline.encodedIsoline).map(
          (line) => {
            return {
              latitude: line[0],
              longitude: line[1],
            };
          }
        ),
        transportMode: mapObj.isoline.transportMode,
        rangeType: mapObj.isoline.rangeType,
        radiusMagnitude: mapObj.isoline.radiusMagnitude,
      },
      waypointsRoute: {
        decodedPoints: decoderGOOGLE(mapObj.waypointsRoute.encodedPoints),
        encodedPoints: mapObj.waypointsRoute.encodedPoints,
        routeDuration: mapObj.waypointsRoute.routeDuration,
        routeDistance: mapObj.waypointsRoute.routeDistance,
      },
      userTrack: mapObj.userTrack,
    });
  };

  // watchForLocationChanges = () => {
  //   this.setState({ trackingUserBool: !this.state.trackingUserBool });

  //   this.watchID = navigator.geolocation.watchPosition(
  //     (position) => {
  //       // const {
  //       //   coordinate,
  //       //   userRouteCoordinates,
  //       //   userDistanceTravelled,
  //       // } = this.state;
  //       const { latitude, longitude } = position.coords;

  //       const newCoordinate = {
  //         latitude: latitude,
  //         longitude: longitude,
  //       };
  //       if (Platform.OS === "android") {
  //         if (this.marker) {
  //           this.marker._component.animateMarkerToCoordinate(
  //             newCoordinate,
  //             500
  //           );
  //         }
  //       }
  //       // else {
  //       //   coordinate.timing(newCoordinate).start();
  //       // }

  //       let initialRegion = { ...this.state.initialRegion };
  //       initialRegion.latitude = latitude;
  //       initialRegion.longitude = longitude;

  //       let userTrack = { ...this.state.userTrack };
  //       userTrack.routeCoordinates = userTrack.routeCoordinates.concat(
  //         newCoordinate
  //       );
  //       userTrack.distanceTravelled =
  //         userTrack.distanceTravelled + this.calcDistance(newCoordinate);

  //       this.setState({
  //         initialRegion: initialRegion,
  //         userTrack: userTrack,
  //       });
  //     },
  //     (error) => {
  //       Toast.show({
  //         text: "Oops, something went wrong",
  //         buttonText: "Okay",
  //         type: "danger",
  //       });
  //     },
  //     { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, accuracy: 0.1 }
  //   );
  // };

  watchForLocationChanges = () => {
    this.setState({ trackingUserBool: !this.state.trackingUserBool });
    (async () => {
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          // timeInterval: 100,
          distanceInterval: 5,
        },
        (loc) => {
          const newCoordinate = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };

          let prevLatLng = {
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude,
          };

          // console.log(loc.coords.latitude, this.state.initialRegion.latitude);
          // console.log(this.calcDistance(newCoordinate,prevLatLng))
          let initialRegion = { ...this.state.initialRegion };
          initialRegion.latitude = loc.coords.latitude;
          initialRegion.longitude = loc.coords.longitude;
          let userTrack = { ...this.state.userTrack };
          userTrack.routeCoordinates = userTrack.routeCoordinates.concat(
            newCoordinate
          );
          userTrack.distanceTravelled =
            userTrack.distanceTravelled +
            getDistance(newCoordinate, prevLatLng, 0.01);

          this.setState({
            initialRegion: initialRegion,
            userTrack: userTrack,
          });
        }
      );
      if (!this.state.trackingUserBool) {
        location.remove();
      }
    })();
    //     let initialRegion = { ...this.state.initialRegion };
    //     initialRegion.latitude = latitude;
    //     initialRegion.longitude = longitude;

    //     let userTrack = { ...this.state.userTrack };
    //     userTrack.routeCoordinates = userTrack.routeCoordinates.concat(
    //       newCoordinate
    //     );
    //     userTrack.distanceTravelled =
    //       userTrack.distanceTravelled + this.calcDistance(newCoordinate);

    //     this.setState({
    //       initialRegion: initialRegion,
    //       userTrack: userTrack,
    //     });
    //   },
    //   (error) => {
    //     Toast.show({
    //       text: "Oops, something went wrong",
    //       buttonText: "Okay",
    //       type: "danger",
    //     });
    //   },
    //   { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, accuracy: 0.1 }
    // );
  };
  calcDistance = (newLatLng, prevLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };
  submitSettings = () => {
    this.getAllNearbyPlaces();
    this.handleChangeFooterTab("Map");
  };

  render() {
    // const Stack = createStackNavigator();
    // var directions = new GDirections ();

    if (!this.state.isReady) {
      return null
    }

    // const Map =()=> (
    //   <Map
    //     initialRegion={this.state.initialRegion}
    //     chosenNearbyPlaces={this.state.nearbyPlaces.chosenNearbyPlaces}
    //     isoline={this.state.isoline}
    //     userTrack={this.state.userTrack}
    //     waypointsRoute={this.state.waypointsRoute}
    //     trackingUserBool={this.state.trackingUserBool}
    //     watchForLocationChanges={this.watchForLocationChanges}
    //     getChosenNearbyPlaces={this.getChosenNearbyPlaces}
    //     saveMap={this.saveMap}
    //   />
    // );
    return (
      <Root>
        <Container>
          <Layout
            selectedFooterTab={this.state.selectedFooterTab}
            handleChangeFooterTab={this.handleChangeFooterTab}
          >
            {/* <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Map" component={Map} />

                

            
              </Stack.Navigator>
            </NavigationContainer> */}
            {this.state.selectedFooterTab === "Map" ? (
              // <Newmap2/>
              <Map
                initialRegion={this.state.initialRegion}
                chosenNearbyPlaces={this.state.nearbyPlaces.chosenNearbyPlaces}
                isoline={this.state.isoline}
                userTrack={this.state.userTrack}
                waypointsRoute={this.state.waypointsRoute}
                trackingUserBool={this.state.trackingUserBool}
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
                numberOfRequstsByUser={this.state.numberOfRequstsByUser}
                onChangeNumberOfRequstsByUser={(val) => {
                  this.setState({ numberOfRequstsByUser: val });
                }}
                handleSettingsInputChange={this.handleSettingsInputChange}
                submitSettings={this.submitSettings}
              />
            ) : null}
            {this.state.selectedFooterTab === "Profile" ? (
              <Profile setNewMap={this.setNewMap} />
            ) : null}
          </Layout>
        </Container>
      </Root>
    );
  }
}
