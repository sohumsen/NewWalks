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
import MapImages from './MapImages'
export default class ListIconExample extends Component {
  state = {
    showNavigate: false,
  };
  render() {
    console.log(this.props.deviceId)
    return (
      <Container>
        <Header>
          <Body>
            <Title>{this.props.deviceId}</Title>
          </Body>
        </Header>
        <Content>
          <MapImages />
         
        </Content>
      </Container>
    );
  }
}
