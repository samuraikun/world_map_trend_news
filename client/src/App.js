import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

// set mapbox access token
const MAPBOX_TOKEN = '';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 35.681167,
        longitude: 139.767052,
        zoom: 3
      }
    };
  }

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    );
  }
}

export default Map;
console.log(process.env.MapboxAccessToken);
