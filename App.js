import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Layout from "./src/Layout";
import Map from "./src/Map";
import Settings from "./src/Settings";
import Profile from "./src/Profile/Profile";

import Constants from "expo-constants";

export default class App extends React.Component {
  state = {
    deviceId: Constants.deviceId,
    isReady: false,
    selectConfig: false,
    selectedFooterTab: "Map",
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  onSelectConfigButton = () => {
    this.setState({ selectConfig: !this.state.selectConfig });
  };

  handleChangeFooterTab = (name) => {
    this.setState({ selectedFooterTab: name });
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Layout
          onSelectConfigButton={this.onSelectConfigButton}
          selectedFooterTab={this.state.selectedFooterTab}
          handleChangeFooterTab={this.handleChangeFooterTab}
        >
          {this.state.selectedFooterTab === "Map" ? (
            <Map
              selectConfig={this.state.selectConfig}
              onSelectConfigButton={this.onSelectConfigButton}
            />
          ) : null}
          {this.state.selectedFooterTab === "Settings" ? (
            <Settings
            // getAllNearbyPlaces={this.getAllNearbyPlaces}
            // radiusDistance={this.props.radiusDistance}
            // handleRadiusDistanceChange={this.handleRadiusDistanceChange}
            />
          ) : null}
          {this.state.selectedFooterTab === "Profile" ? (
            <Profile deviceId={this.state.deviceId} />
          ) : null}
        </Layout>
      </Container>
    );
  }
}
