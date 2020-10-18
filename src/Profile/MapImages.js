import React, { Component } from "react";
import { AsyncStorage, Image, ScrollView } from "react-native";
import { List, View } from "native-base";
import MapImage from "./MapImage";
import { Card, CardItem, Body, Text, Content } from "native-base";
import { AdMobBanner } from "expo-ads-admob";

export default class CardImageExample extends Component {
  render() {
    return (
      <List>
        {this.props.mapData.length !== 0 ? (
        //    <AdMobBanner
        //    style={{
        //      position: "absolute",
        //      bottom:0
        //    }}
        //    bannerSize="smartBannerPortrait"
        //    testDeviceID="EMULATOR"
        //    adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
        //    servePersonalizedAds // true or false
        //    onDidFailToReceiveAdWithError={(e) => {
        //      console.log(e);
        //    }}
        //  />
          this.props.mapData.map((mapObj, i) => {
            return (
              <MapImage
                key={i}
                mapObj={mapObj}
                removeData={this.props.removeData}
                replayMap={this.props.replayMap}
              />
            );
          })
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
                position: "relative",
                left: "20%",
                width: "60%",
                height: "60%",
              }}
            />
           
          </View>
        )}
      </List>
    );
  }
}
