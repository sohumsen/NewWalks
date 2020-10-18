import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import React, { Component } from "react";

class Ad extends Component {
  state = {};
  async componentDidMount() {
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/5135589807");
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
    await AdMobInterstitial.showAdAsync();
    AdMobInterstitial.addEventListener("interstitialDidClose",()=>{

        this.props.onAdClose()
    })
  }

//   componentWillUnmount() {
//     AdMobInterstitial.removeAllListeners();
//     }
  render() {
    return (
        <AdMobBanner
          bannerSize="banner"
          testDeviceID="EMULATOR"
          adUnitID="ca-app-pub-3940256099942544/1712485313" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) => {
            Toast.show({
              text: "Oops, something went wrong",
              buttonText: "Okay",
              type: "danger",
            });
          }}
        />
    );
  }
}
export default Ad;
