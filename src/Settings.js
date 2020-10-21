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
import Config from "./Config";
import Picker from "./UI/Picker";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import Ad from "./UI/Ad";

export default class ListIconExample extends Component {
  state = {
    showNavigate: true,
  };
  render() {
    return (
      // style={styles.container}
      <View style={styles.container}>
        <View>
          <ListItem
            icon
            onPress={() => {
              this.setState({ showNavigate: !this.state.showNavigate });
            }}
          >
            <Left>
              <Button>
                <Icon active name="settings" />
              </Button>
            </Left>
            <Body>
              <Text>Settings</Text>
            </Body>
            <Right>
              <Icon active name="arrow-down" />
            </Right>
          </ListItem>
          {this.state.showNavigate ? (
            <Picker
              transportMode={this.props.transportMode}
              rangeType={this.props.rangeType}
              radiusMagnitude={this.props.radiusMagnitude}
              handleSettingsInputChange={this.props.handleSettingsInputChange}
              submitSettings={this.props.submitSettings}
              numberOfRequstsByUser={this.props.numberOfRequstsByUser}
              onChangeNumberOfRequstsByUser={
                this.props.onChangeNumberOfRequstsByUser
              }
            />
          ) : null}
        </View>

        {/* {this.state.showNavigate ? (
          <Config
            getAllNearbyPlaces={this.props.getAllNearbyPlaces}
            radiusMagnitude={this.props.radiusMagnitude}
            handleradiusMagnitudeChange={this.props.handleradiusMagnitudeChange}
            handleChangeFooterTab={this.props.handleChangeFooterTab}
          />
        ) : null} */}

        <AdMobBanner
          style={styles.bottomBanner}
          // bannerSize="smartBannerPortrait"
          // testDeviceID="EMULATOR"
          // adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
          // adUnitID="ca-app-pub-3651117412361356/4549455260" // Test ID, Replace with your-admob-unit-id

          adUnitID={
            Platform.OS === "ios"
              ? "ca-app-pub-3651117412361356/4549455260"
              : "ca-app-pub-3651117412361356/2607125111"
          } // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) => {
            console.log(e);
            // Toast.show({
            //   text: e,
            //   buttonText: "Okay",
            //   type: "danger",
            // });
          }}
        />
        {/* <Ad/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomBanner: {
    position: "absolute",
    bottom: 0,
  },
  container: {
    // width: Dimensions.get("window").width,
    width: "100%",
    height: Dimensions.get("window").height - 140,
  },
});
