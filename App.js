import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Layout from './src/Layout'
import Map from './src/Map'

export default class App extends React.Component {
  state = {
    isReady: false,
    selectConfig:false
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  onSelectConfigButton=()=>{
    this.setState({selectConfig:!this.state.selectConfig})
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Layout onSelectConfigButton={this.onSelectConfigButton}>
          <Map selectConfig={this.state.selectConfig} onSelectConfigButton={this.onSelectConfigButton}/>
        </Layout>
      </Container>
    );
  }
}
