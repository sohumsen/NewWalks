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
            handleSettingsChange={this.props.handleSettingsChange}
            radiusDistance={this.props.radiusDistance}
          />
        ) : null}

        {/* {this.state.showNavigate ? (
          <Config
            getAllNearbyPlaces={this.props.getAllNearbyPlaces}
            radiusDistance={this.props.radiusDistance}
            handleRadiusDistanceChange={this.props.handleRadiusDistanceChange}
            handleChangeFooterTab={this.props.handleChangeFooterTab}
          />
        ) : null} */}
      </Content>
    );
  }
}
