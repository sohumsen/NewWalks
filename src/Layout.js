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
            <Button transparent onPress={this.props.onSelectConfigButton}>
              <Icon name="settings" />
            </Button>
          </Left>
          <Body>
            <Title>Where do i go</Title>
          </Body>
          <Right />
        </Header>
        <Content>{this.props.children}</Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>© Sohum</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
