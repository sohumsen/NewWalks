import React, { Component } from "react";
import { AsyncStorage, Image } from "react-native";
import { List } from "native-base";
import MapImage from "./MapImage";
import { Card, CardItem, Body, Text, Content } from "native-base";

export default class CardImageExample extends Component {
  render() {
    return (
        <List>
          {this.props.mapData.length !== 0 ? (
            this.props.mapData.map((mapObj, i) => {
              return (
                <MapImage
                  key={i}
                  mapObj={mapObj}
                  removeData={this.props.removeData}
                  replayMap={this.props.replayMap}
                />
              );
            })
          ) : (
            <Card>
              <CardItem>
                <Body>
                  <Text>
                    Oops, you dont have any maps saved. Try saving one from the
                    Navigate tab
                  </Text>
                </Body>
              </CardItem>
            </Card>
          )}
        </List>
    );
  }
}
