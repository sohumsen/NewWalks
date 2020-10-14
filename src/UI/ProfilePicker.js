import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form,
  Item,
  Input,
  Button,
  Text,
} from "native-base";
import { View } from "react-native";
import Ad from "./Ad";



export default class PickerWithIcon extends Component {
  state = {
    showAd: false,
  };
  render() {
    return (
      <Form>
        <Item picker>
          <Picker
            mode="dropdown"
            iosHeader="Range type"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={this.props.rangeType}
            onValueChange={(val) =>
              this.props.handleSettingsInputChange("rangeType", val)
            }
          >
            <Picker.Item label="Time (s)" value="time" />
            <Picker.Item label="Distance (m)" value="distance" />
          </Picker>

          <Picker
            mode="dropdown"
            iosHeader="Transport type"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={this.props.transportMode}
            onValueChange={(val) =>
              this.props.handleSettingsInputChange("transportMode", val)
            }
          >
            <Picker.Item label="Walking" value="pedestrian" />
            <Picker.Item label="Car" value="car" />
            <Picker.Item label="Truck" value="truck" />
          </Picker>
        
        </Item>

       
      </Form>
    );
  }
}
