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
        rounded 
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
            rounded 
              onPress={() => this.props.saveMap()}
              style={{ margin: 2, backgroundColor: "green" }}
            >
              <Icon name="save" />
            </Button>
            <Button
            rounded 
              style={{ margin: 2, backgroundColor: "red" }}
              onPress={() => this.props.getChosenNearbyPlaces()}
            >
              <Icon name="create" />
            </Button>
            {/* <Button
              style={{ margin: 2, backgroundColor: "green" }}
              onPress={() => this.props.watchForLocationChanges()}
            >
              <Icon name="ios-arrow-dropright" />
            </Button> */}
          </View>
        ) : null}
      </View>
    );
  }
}
