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
} from "native-base";
import MapImages from "./MapImages";
import { AsyncStorage } from "react-native";
export default class Profile extends Component {
  state = {
    showNavigate: false,
    mapData: null,
  };
  componentDidMount() {
    this.importData();
  }
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      let data = result.map((req) => {
        return { [req[0]]: JSON.parse(req[1]) };
      });
      this.setState({ mapData: data });
    } catch (error) {
      console.error(error);
    }
  };

  removeMap = async (key) => {
    try {
      const value = await AsyncStorage.removeItem(key);
      let mapData = [...this.state.mapData];
      let idx = mapData.findIndex((e) => {
        return Object.keys(e)[0] === key;
      });
      mapData.splice(idx, 1);

      // let mapData=this.state.mapData.filter(mapObj=>mapObj.)
      // console.log(this.state.mapData)
      // delete this.state.mapData[key]
      this.setState({ mapData: mapData });
      if (value !== null) {
        // We have data!!
      }
    } catch (error) {
      console.log(error);

      // Error retrieving data
    }
  };
  replayMap = (key) => {
    console.log("replay")
    let mapData = [...this.state.mapData];
    let idx = mapData.findIndex((e) => {
      return Object.keys(e)[0] === key;
    });

    
    this.props.setNewMap(mapData[idx][key])
    this.props.handleChangeFooterTab("Map")
  };

  render() {
    return (
      <Content>
        {this.state.mapData !== null ? (
          <MapImages mapData={this.state.mapData} removeData={this.removeMap} replayMap={this.replayMap}/>
        ) : null}
      </Content>
    );
  }
}
