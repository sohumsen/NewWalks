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
        {/* <ImageBackground
          // source={require("../assets/Title_Transparent.png")}
          // style={{
          //   width: "60%",
          //   backgroundColor: "red",
          //   position:"relative",
          //   left:"30%",
          //   // height: Platform.OS === "ios" ? 64 : 56
          // }}
        > */}
        <Header style={{ backgroundColor: "transparent" }}>
          <Body>
            {/* <Title>XPLORE</Title> */}
            <Image
              source={require("../assets/Title_Transparent.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
          </Body>
        </Header>
        {/* </ImageBackground> */}

        <Content>{this.props.children}</Content>
        <Footer>
          <FooterTab>
            <Button
              rounded
              vertical
              active={this.props.selectedFooterTab === "Settings"}
              onPress={() => {
                this.props.handleChangeFooterTab("Settings");
              }}
              style={{
                margin: 8,
              }}
            >
              <Icon name="settings" />
              <Text>Settings</Text>
            </Button>
            <Button
              rounded
              vertical
              active={this.props.selectedFooterTab === "Map"}
              onPress={() => {
                this.props.handleChangeFooterTab("Map");
              }}
              style={{
                margin: 8,
              }}
            >
              <Icon
                name="navigate"
              
              />
              <Text>Navigate</Text>
            </Button>
            <Button
              rounded
              vertical
              active={this.props.selectedFooterTab === "Profile"}
              onPress={() => {
                this.props.handleChangeFooterTab("Profile");
              }}
              style={{
                margin: 8,
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
