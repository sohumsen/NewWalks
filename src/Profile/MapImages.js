import React, { Component } from "react";
import { AsyncStorage, Image, ScrollView } from "react-native";
import { List, View } from "native-base";
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
            <View>
              <Card>
                <CardItem>
                  <Body>
                    <Text>
                      Oops, you dont have any maps saved. Try saving one from
                      the Navigate tab
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              <Image
                source={{
                  uri:
                    "https://i.pinimg.com/originals/47/03/09/4703093a70ba47001bf2c86319aae091.gif",
                }}
                style={{
                  position: "relative",
                  left: "20%",
                  width: "60%",
                  height: "60%",
                }}
              />
            </View>
          )}
      </List>
    );
  }
}
