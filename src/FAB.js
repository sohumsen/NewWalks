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
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        >
          <Icon name="open" />
        </Button>

        {this.state.active ? (
          <View>
            <Button
              onPress={() => this.props.saveMap()}
              style={{
                marginTop: 5,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "green",
              }}
            >
              <Icon name="save" />
            </Button>
            <Button
              style={{
                marginTop: 5,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "red",
              }}
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
