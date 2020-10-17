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
import { Image, ImageBackground, Platform } from "react-native";
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          // source={{
          //   uri:
          //     "https://www.nationalgeographic.com/content/dam/ngdotcom/rights-exempt/maps/world-classic-2018-banner-clip-72.jpg",
          // }}
          style={{width: "100%", height: 90}}
          // style={{ height: Platform.OS === "ios" ? 64 : 56, width: null }}
        >
          <Header style={{ backgroundColor: "transparent" }}>
            <Body>
              <Title>XPLORE</Title>
              {/* <Image
              source={{
                uri:
                  "https://www.nationalgeographic.com/content/dam/ngdotcom/rights-exempt/maps/world-classic-2018-banner-clip-72.jpg",
              }}
              style={{ width: 200, height: 35, resizeMode: "contain" }}
            /> */}
            </Body>
          </Header>
        </ImageBackground>

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
