import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from "native-base";
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
          
          </Left>
          <Body>
            <Title>Where do i go</Title>
          </Body>
          <Right />
        </Header>
        <Content>{this.props.children}</Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={this.props.selectedFooterTab === "Settings"}
              onPress={() => {
                this.props.handleChangeFooterTab("Settings");
              }}
            >
              <Icon name="settings" />
              <Text>Settings</Text>
            </Button>
            <Button
              vertical
              active={this.props.selectedFooterTab === "Map"}
              onPress={() => {
                this.props.handleChangeFooterTab("Map");
              }}
            >
              <Icon name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button
              vertical
              active={this.props.selectedFooterTab === "Profile"}
              onPress={() => {
                this.props.handleChangeFooterTab("Profile");
              }}
            >
              <Icon active name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
