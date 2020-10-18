import React, { Component } from "react";
import MapView from "react-native-maps";

export default class AnimatedPolyline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      coords: []
    };
  }
  componentDidMount() {
    this._animate(this.props.coordinates);
  }
//   static getDerivedStateFromProps(nextProps){
//     // if (nextProps.coordinates !== this.props.coordinates) {
//     //   this._animate(nextProps.coordinates);
//     // }
//   return null;
//  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates !== this.props.coordinates) {
      this._animate(nextProps.coordinates);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.coords.length !== this.state.coords.length) {
      return true;
    }
    return false;
  }
  _animate(allCoords) {
    const self = this;
    const len = allCoords.length;
    let completed = 0;
    this.state.coords = [];
    const steps = parseInt((allCoords.length / this.props.steps), 10);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const coords = this.state.coords.slice(0);
      for (let i = completed; i < (completed + steps) && i <= len; i += 1) {
        if (allCoords[i]) {
          coords.push(allCoords[i]);
        }
      }
      self.setState({ coords });
      if (completed >= len) {
        clearInterval(self.interval);
      }
      completed += steps;
    }, (this.props.interval));
  }
  render() {
    return (
      <MapView.Polyline
        {...this.props}
        coordinates={[...this.state.coords]}
      />
    );
  }
}