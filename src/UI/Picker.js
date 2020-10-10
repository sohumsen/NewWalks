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
import {View} from 'react-native'

export default class PickerWithIcon extends Component {
  render() {

    return (
      <Container>
        <Content>
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
              <Input
                keyboardType="numeric"
                value={this.props.radiusMagnitude.toString()}

                onChangeText={(val) =>
                  this.props.handleSettingsInputChange("radiusMagnitude", val)
                }
              />
            </Item>

            <View style={{
              position:"relative",
              left:"25%"
            }}>
            <Button onPress={()=>{this.props.submitSettings()}}>
                <Text>APPLY CHANGES</Text>
                <Icon name="arrow-forward" />
              </Button>

            </View>
            
            
          </Form>
        </Content>
      </Container>
    );
  }
}
