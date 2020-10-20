import React, { Component } from "react";
import { AsyncStorage, Image, Platform, ScrollView,View } from "react-native";
import { List, Toast } from "native-base";
import MapImage from "./MapImage";
import { Card, CardItem, Body, Text, Content } from "native-base";
import { AdMobBanner } from "expo-ads-admob";

export default class CardImageExample extends Component {
  render() {
    return (
      <List>
        {this.props.mapData.length !== 0 ? (
          <View>
         
         { this.props.mapData.map((mapObj, i) => {
            return (
              <MapImage
                key={i}
                mapObj={mapObj}
                removeData={this.props.removeData}
                replayMap={this.props.replayMap}
              />
            );
          })}
            <AdMobBanner
          //  style={{
          //    position: "relative",
          //    top:0
          //  }}
          //  bannerSize="smartBannerPortrait"
          //  testDeviceID="EMULATOR"
          // adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
          adUnitID={
            Platform.OS === "ios"
              ? "ca-app-pub-3651117412361356/7079108195"
              : "ca-app-pub-3651117412361356/1310177703"
          } // Test ID, Replace with your-admob-unit-id
           servePersonalizedAds // true or false
           onDidFailToReceiveAdWithError={(e) => {
            Toast.show({
              text: "Oops, something went wrong",
              buttonText: "Okay",
              type: "danger",
            });
           }}
         />
          </View>
        )
       
        
        : (
          <View>
            <Card>
              <CardItem>
                <Body>
                  <Text>
                    Oops, you dont have any maps saved. Try saving one from the
                    Navigate tab
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Image
              source={require("../../assets/map_walking.gif")}
              style={{
                position:"relative",
                top:"50%",
                width: "100%",
                height: "100%",
              }}
            />
           
          </View>
        )}
      </List>
    );
  }
}
