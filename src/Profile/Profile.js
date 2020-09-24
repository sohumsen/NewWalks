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
      console.log(result);

      let data = result.map((req) => {
        return { [req[0]]: JSON.parse(req[1]) };
      });
      console.log(data);
      this.setState({ mapData: data });
    } catch (error) {
      console.error(error);
    }
  };

  // getAllData=()=>{
  //   AsyncStorage.getAllKeys((err, keys) => {
  //     AsyncStorage.multiGet(keys, (err, stores) => {
  //       stores.map((result, i, store) => {
  //         // get at each store's key/value so you can work with it
  //         let key = store[i][0];
  //         let value = store[i][1];
  //         console.log(result,i,store,key,value)
  //       });
  //     });
  //   });
  // }

  render() {
    console.log(this.props.deviceId);
    return (
      <Container>
        <Header>
          <Body>
            <Title>{this.props.deviceId}</Title>
          </Body>
        </Header>
        <Content>
          {this.state.mapData !== null ? (
            <MapImages mapData={this.state.mapData} />
          ) : null}
        </Content>
      </Container>
    );
  }
}
