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
  Toast,
  Label,
} from "native-base";
import { View } from "react-native";
import Ad from "./Ad";

const MAX_NUMBER_OF_FREE_REQUESTS = 1;
const MAX_DISTANCE_TO_SEARCH = 20000;

export default class PickerWithIcon extends Component {
  state = {
    showAd: false,
  };
  validateInput = (radiusMagnitude) => {
    if (radiusMagnitude > MAX_DISTANCE_TO_SEARCH) {
      Toast.show({
        text: "Error: Too large a field",
        buttonText: "Okay",
        type: "danger",
      });
    } else {
      this.props.onChangeNumberOfRequstsByUser(
        this.props.numberOfRequstsByUser + 1
      );
      this.props.numberOfRequstsByUser < MAX_NUMBER_OF_FREE_REQUESTS
        ? this.props.submitSettings()
        : () => {
            console.log("not allowed");
          };
    }
  };
  render() {
    return (
      <Form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: 10,
        }}
      >
        <Item picker style={{ margin: 20 }}>
          <Label
            style={{
              color: "grey",
            }}
          >
            Range type
          </Label>

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
        </Item>
        <Item picker style={{ margin: 20 }}>
          <Label
            style={{
              color: "grey",
            }}
          >
            Transport
          </Label>

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
        <Item style={{ margin: 20, width: "50%" }}>
          <Label
            style={{
              color: "grey",
            }}
          >
            Magnitude
          </Label>

          <Input
            keyboardType="numeric"
            value={this.props.radiusMagnitude.toString()}
            onChangeText={(val) =>
              this.props.handleSettingsInputChange("radiusMagnitude", val)
            }
          />
        </Item>

        <View
          style={{
            padding: 10,
          }}
        >
          <Button
            block
            bordered
            rounded
            onPress={() => {
              this.validateInput(this.props.radiusMagnitude);

              // this.props.submitSettings();
            }}
          >
            <Text>APPLY CHANGES</Text>
            <Icon name="arrow-forward" />
          </Button>

          {this.props.numberOfRequstsByUser > MAX_NUMBER_OF_FREE_REQUESTS ? (
            <Ad onAdClose={this.props.submitSettings} />
          ) : null}
        </View>
      </Form>
    );
  }
}
