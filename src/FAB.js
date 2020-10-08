import React, { Component } from "react";
import { Container, Header, View, Button, Icon, Fab, Text } from "native-base";
export default class FABExample extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }
  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.setState({ active: !this.state.active });
          }}
          style={{ margin: 2 }}
        >
          <Icon name="open" />
        </Button>

        {this.state.active ? (
          <View>
            <Button
              onPress={() => this.props.saveMap()}
              style={{ margin: 2, backgroundColor: "brown" }}
            >
              <Icon name="save" />
            </Button>
            <Button
              style={{ margin: 2, backgroundColor: "purple" }}
              onPress={() => this.props.getChosenNearbyPlaces()}
            >
              <Icon name="create" />
            </Button>
            <Button
              style={{ margin: 2, backgroundColor: "green" }}
              onPress={() => this.props.watchForLocationChanges()}
            >
              <Icon name="ios-arrow-dropright" />
            </Button>
          </View>
        ) : null}
      </View>
    );
  }
}
