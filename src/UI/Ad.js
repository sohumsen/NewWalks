import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import React, { Component } from "react";

class Ad extends Component {
  state = {};
  async componentDidMount() {
    AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/1712485313");
    // await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    // await AdMobInterstitial.showAdAsync();
  }
  render() {
    return (
        <AdMobBanner
          bannerSize="banner"
          testDeviceID="EMULATOR"
          adUnitID="ca-app-pub-3940256099942544/1712485313" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={(e) => {
            console.log(e);
          }}
        />
    );
  }
}
export default Ad;
