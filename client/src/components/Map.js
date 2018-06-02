import React, { Component } from 'react';
import axios from 'axios';
import worldmap from '../world-50m.json';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import Modal from 'react-modal';
import ArticleList from './ArticleList';

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

Modal.setAppElement('#root');

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      articles: []
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async fetchCountryNews(event) {
    try {
      const response = await axios.get('/api/news/recent', {
        params: {
          category: 'technology',
          country: 'jp'
        }
      });

      this.setState({ articles: response.data.articles });
    } catch (err) {
      console.log(err);
    }
  }

  handleOpenModal(event) {
    this.fetchCountryNews(event);

    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
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
                  onClick={this.handleOpenModal}
                  style={geoStyles}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="minila modal example"
        >
          <ArticleList articles={this.state.articles} />
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    )
  }
}

export default Map;