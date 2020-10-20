import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import { Toast } from "native-base";
import React, { Component } from "react";
import { Platform, View } from "react-native";

class Ad extends Component {
  state = {};
  async componentDidMount() {
    // await AdMobInterstitial.setAdUnitID(
    //   "ca-app-pub-3940256099942544/5135589807"
    // );
    let add_id=  Platform.OS === "ios"
    ? "ca-app-pub-3651117412361356/8126867493"
    : "ca-app-pub-3651117412361356/8326694968"
    await AdMobInterstitial.setAdUnitID(
      add_id
    );
  
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
    // AdMobInterstitial.addEventListener("interstitialDidClose",()=>{
    //   console.log("onAdClose")
    //     this.props.onAdClose()

    // })

    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );

    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      console.log("interstitialDidFailToLoad")
    );

    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      console.log("interstitialDidClose");

      this.props.onAdClose();
    });
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      console.log("interstitialWillLeaveApplication")
    );
  }
  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  render() {
    console.log("run ad");
    return (
      <View></View>
      // <AdMobBanner
      //   bannerSize="banner"
      //   testDeviceID="EMULATOR"
      //   servePersonalizedAds // true or false
      //   onDidFailToReceiveAdWithError={(e) => {
      //     console.log(e)
      //     Toast.show({
      //       text: "Oops, something went wrong",
      //       buttonText: "Okay",
      //       type: "danger",
      //     });
      //   }}
      // />
    );
  }
}
export default Ad;
