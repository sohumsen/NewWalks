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
  Title, Toast
} from "native-base";
import Config from "./Config";
import Picker from "./UI/Picker";
export default class ListIconExample extends Component {
  state = {
    showNavigate: false,
  };
  render() {
    return (
      <Content>
        <ListItem
          icon
          onPress={() => {
            this.setState({ showNavigate: !this.state.showNavigate });
          }}
        >
          <Left>
            <Button>
              <Icon active name="navigate" />
            </Button>
          </Left>
          <Body>
            <Text>Navigate</Text>
          </Body>
          <Right>
            <Icon active name="arrow-down" />
          </Right>
        </ListItem>
        {this.state.showNavigate ? (
          <Picker
            transportMode={this.props.transportMode}
            rangeType={this.props.rangeType}
            radiusMagnitude={this.props.radiusMagnitude}

            handleSettingsInputChange={this.props.handleSettingsInputChange}
            submitSettings={this.props.submitSettings}
          />
        ) : null}

        {/* {this.state.showNavigate ? (
          <Config
            getAllNearbyPlaces={this.props.getAllNearbyPlaces}
            radiusMagnitude={this.props.radiusMagnitude}
            handleradiusMagnitudeChange={this.props.handleradiusMagnitudeChange}
            handleChangeFooterTab={this.props.handleChangeFooterTab}
          />
        ) : null} */}
      
      </Content>
    );
  }
}
