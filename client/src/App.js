import React, { Component } from 'react';
import axios from 'axios';
import worldmap from './world-50m.json';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';

const wrapperStyles = {
  width: "80%",
  height: "80%",
  margin: "0 auto"
}

const geoStyles = {
  default: {
    fill: "#00CC33",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  hover: {
    fill: "#607D8B",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  pressed: {
    fill: "#FF5722",
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  }
}

class Map extends Component {
  async handleClick() {
    try {
      const response = await axios.get('/api/news/sources?country=us&language=en');

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[20,30]} disablePanning>
            <Geographies geography={worldmap}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  onClick={this.handleClick}
                  style={geoStyles}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map;
